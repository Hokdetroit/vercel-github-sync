import { useEffect, useRef } from "react";

export function MirroredPage({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let removeDocumentListener = () => {};

    function connectNavigation() {
      removeDocumentListener();
      const document = frame?.contentDocument;
      if (!document) return;
      const navigate = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const target = event.target as Element | null;
        const link = target?.closest<HTMLAnchorElement>("a[href]");
        if (!link || link.hasAttribute("download") || link.target === "_blank") return;
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;
        const url = new URL(link.href);
        if (url.origin !== window.location.origin) return;
        event.preventDefault();
        window.location.assign(url.href);
      };
      document.addEventListener("click", navigate, true);
      removeDocumentListener = () => document.removeEventListener("click", navigate, true);
    }

    connectNavigation();
    frame.addEventListener("load", connectNavigation);
    return () => {
      frame.removeEventListener("load", connectNavigation);
      removeDocumentListener();
    };
  }, [src]);

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      className="fixed inset-0 block h-full w-full border-0"
      allow="autoplay; fullscreen; picture-in-picture"
    />
  );
}
