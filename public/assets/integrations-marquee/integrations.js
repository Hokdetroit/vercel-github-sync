(function () {
  var section = document.querySelector(".se-int");
  if (!section) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rows = Array.prototype.slice.call(section.querySelectorAll(".se-int-row"));
  var count = section.querySelector(".se-int-count");
  var total = section.querySelectorAll(".se-int-track > .se-int-tile").length;

  rows.forEach(function (row, r) {
    var track = row.querySelector(".se-int-track");
    var originals = Array.prototype.slice.call(track.children);
    originals.forEach(function (tile, i) {
      tile.style.setProperty("--delay", (r * 0.08 + i * 0.04).toFixed(2) + "s");
    });
    originals.forEach(function (tile) {
      var clone = tile.cloneNode(true);
      clone.setAttribute("data-clone", "");
      track.appendChild(clone);
    });
  });

  var reveal = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-in");
          reveal.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  reveal.observe(section);

  var chips = Array.prototype.slice.call(section.querySelectorAll(".se-int-chip"));
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var key = chip.getAttribute("data-filter");
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c === chip));
      });
      section.setAttribute("data-active", key);
      var matches = 0;
      section.querySelectorAll(".se-int-tile").forEach(function (tile) {
        var hit = key !== "all" && tile.getAttribute("data-cat") === key;
        tile.classList.toggle("is-match", hit);
        if (hit && !tile.hasAttribute("data-clone")) matches++;
      });
      count.innerHTML =
        key === "all"
          ? "<strong>" + total + "+</strong> native integrations and connections"
          : "<strong>" + matches + "</strong> " + chip.textContent + " integrations";
    });
  });

  if (reduceMotion) return;

  var state = rows.map(function (row) {
    return {
      track: row.querySelector(".se-int-track"),
      dir: Number(row.getAttribute("data-dir")) || -1,
      base: Number(row.getAttribute("data-speed")) || 25,
      speed: Number(row.getAttribute("data-speed")) || 25,
      target: 1,
      factor: 1,
      x: 0,
      half: 0,
    };
  });

  function measure() {
    state.forEach(function (s) {
      s.half = s.track.scrollWidth / 2;
    });
  }
  measure();
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);

  rows.forEach(function (row, i) {
    row.addEventListener("pointerenter", function () { state[i].target = 0; });
    row.addEventListener("pointerleave", function () { state[i].target = 1; });
  });

  var lastScroll = window.scrollY;
  var boost = 0;
  var visible = false;
  var raf = 0;
  var last = 0;

  function frame(now) {
    var dt = Math.min((now - (last || now)) / 1000, 0.05);
    last = now;
    var scrollY = window.scrollY;
    boost += (Math.min(Math.abs(scrollY - lastScroll) * 6, 220) - boost) * 0.08;
    lastScroll = scrollY;

    state.forEach(function (s) {
      s.factor += (s.target - s.factor) * 0.1;
      if (!s.half) return;
      s.x += s.dir * (s.base + boost * s.target) * s.factor * dt;
      if (s.x <= -s.half) s.x += s.half;
      if (s.x > 0) s.x -= s.half;
      s.track.style.transform = "translate3d(" + s.x.toFixed(2) + "px,0,0)";
    });
    raf = visible ? requestAnimationFrame(frame) : 0;
  }

  state.forEach(function (s) {
    if (s.dir > 0) s.x = -s.half / 2;
  });

  new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible && !raf) {
      last = 0;
      lastScroll = window.scrollY;
      raf = requestAnimationFrame(frame);
    }
  }).observe(section);
})();
