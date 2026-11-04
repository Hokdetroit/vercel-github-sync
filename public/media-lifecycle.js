(() => {
  const videos = [...document.querySelectorAll('video[data-managed-media]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const candidates = new Set();
  const releaseTimers = new Map();
  const userPaused = new WeakSet();
  let scheduled = false;

  function visible(video) {
    const bounds = video.getBoundingClientRect();
    if (!bounds.width || !bounds.height || bounds.bottom <= 0 || bounds.top >= innerHeight || bounds.right <= 0 || bounds.left >= innerWidth) return false;
    for (let element = video; element && element !== document.body; element = element.parentElement) {
      const style = getComputedStyle(element);
      if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) < 0.1) return false;
    }
    return true;
  }

  function load(video) {
    if (video.dataset.mediaLoaded) return;
    for (const element of [video, ...video.querySelectorAll('source')]) {
      if (element.dataset.mediaSrc) element.setAttribute('src', element.dataset.mediaSrc);
    }
    video.dataset.mediaLoaded = 'true';
    video.load();
  }

  function release(video) {
    video.pause();
    if (!video.dataset.mediaLoaded || video.controls) return;
    for (const element of [video, ...video.querySelectorAll('source')]) {
      if (element.dataset.mediaSrc) element.removeAttribute('src');
    }
    delete video.dataset.mediaLoaded;
    video.load();
  }

  function update() {
    scheduled = false;
    let playing = 0;
    for (const video of videos) {
      const active = !document.hidden && candidates.has(video) && visible(video) && playing < 2;
      if (active) {
        playing++;
        clearTimeout(releaseTimers.get(video));
        releaseTimers.delete(video);
        load(video);
        if (video.dataset.mediaAutoplay === 'true' && !reducedMotion.matches && !userPaused.has(video) && video.paused) {
          video.muted = true;
          video.play().catch(() => {});
        } else if (reducedMotion.matches && video.dataset.mediaAutoplay === 'true') {
          video.pause();
        }
      } else {
        video.pause();
        if (video.dataset.mediaLoaded && !releaseTimers.has(video)) {
          releaseTimers.set(video, setTimeout(() => {
            releaseTimers.delete(video);
            release(video);
          }, 1500));
        }
      }
    }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(update, 100);
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) candidates.add(entry.target);
      else candidates.delete(entry.target);
    }
    schedule();
  }, { threshold: [0, 0.1, 0.5, 1] });

  for (const video of videos) {
    video.preload = 'none';
    observer.observe(video);
    video.addEventListener('play', () => {
      if (document.hidden || !visible(video)) video.pause();
    });
  }

  document.addEventListener('click', event => {
    const control = event.target.closest?.('.w-background-video--control');
    if (!control) return;
    const video = document.getElementById(control.getAttribute('aria-controls'));
    if (!video?.matches('video[data-managed-media]')) return;
    queueMicrotask(() => {
      if (video.paused) userPaused.add(video);
      else userPaused.delete(video);
    });
  });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', update);
  addEventListener('pagehide', () => videos.forEach(release));
  addEventListener('pageshow', schedule);
})();
