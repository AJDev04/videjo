import { useEffect, useRef } from "react";

/**
 * Aangepaste cursor met smooth-follow — port van het cursor-blok in
 * legacy/js/scripts.js. Hover-status (.cursor-hover) via event-delegatie op
 * a/button, zodat het ook werkt voor elementen die later in de DOM komen.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const loop = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursor.style.left = currentX + "px";
      cursor.style.top = currentY + "px";
      rafId = requestAnimationFrame(loop);
    };

    const onOver = (e: Event) => {
      if ((e.target as Element)?.closest("a, button")) {
        cursor.classList.add("cursor-hover");
      }
    };
    const onOut = (e: Event) => {
      if ((e.target as Element)?.closest("a, button")) {
        cursor.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={dotRef}></div>
    </>
  );
}
