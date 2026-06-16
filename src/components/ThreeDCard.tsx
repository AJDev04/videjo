import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * 3D-tilt-kaart (vanilla port van het Aceternity "3d-card", zonder Tailwind).
 * De kaart kantelt mee met de muis (perspectief) en `CardItem`-elementen krijgen
 * bij hover een translateZ zodat ze vóór de kaart "zweven" / uitsteken.
 *
 * - CardContainer: zet het perspectief + kantelt het binnenste vlak naar de muis.
 * - CardBody: het kaart-vlak zelf (preserve-3d zodat kinderen diepte krijgen).
 * - CardItem: zweeft naar voren (translateZ) zolang de muis op de kaart staat.
 */
const MouseEnterContext = createContext<boolean>(false);

export function CardContainer({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  /** Op het kantelende binnenvlak. */
  className?: string;
  /** Op de buitenste (perspectief-)wrapper. */
  containerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 16;
    const y = (e.clientY - top - height / 2) / 16;
    el.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleLeave = () => {
    setEntered(false);
    if (ref.current) ref.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <MouseEnterContext.Provider value={entered}>
      <div className={containerClassName} style={{ perspective: "1000px" }}>
        <div
          ref={ref}
          onMouseEnter={() => setEntered(true)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className={className}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.15s ease",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
}: {
  children: ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useContext(MouseEnterContext);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = entered
      ? `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`
      : "translate3d(0px, 0px, 0px)";
  }, [entered, translateX, translateY, translateZ]);

  return (
    <div ref={ref} className={className} style={{ transition: "transform 0.2s ease" }}>
      {children}
    </div>
  );
}
