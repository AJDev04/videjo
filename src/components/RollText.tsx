import { useEffect, useRef, useState } from "react";

const STAGGER = 40;
const DURATION = 460;

type Roll = { from: string; to: string; cycle: number } | null;

export default function RollText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(text);
  const [roll, setRoll] = useState<Roll>(null);
  const prev = useRef(text);
  const cycleRef = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (text === prev.current) return;
    const from = prev.current;
    prev.current = text;
    timers.current.forEach(clearTimeout);
    cycleRef.current += 1;

    setRoll({ from, to: text, cycle: cycleRef.current });

    const slots = Math.max(from.length, text.length);
    const t1 = window.setTimeout(
      () => {
        setCurrent(text);
        setRoll(null);
      },
      DURATION + slots * STAGGER + 60,
    );
    timers.current = [t1];
    return () => timers.current.forEach(clearTimeout);
  }, [text]);

  const cls = `roll${className ? ` ${className}` : ""}`;

  if (!roll) {
    return (
      <span className={cls}>
        {[...current].map((ch, i) => (
          <span className="roll-col" key={i}>
            <span className="roll-glyph">{ch}</span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={cls}>
      {[...roll.to].map((ch, i) => (
        <span className="roll-col" key={`${roll.cycle}-in-${i}`}>
          <span
            className="roll-glyph roll-in"
            style={{ animationDelay: `${i * STAGGER}ms` }}
          >
            {ch}
          </span>
        </span>
      ))}
      <span className="roll-out-layer" aria-hidden="true">
        {[...roll.from].map((ch, i) => (
          <span className="roll-col" key={`${roll.cycle}-out-${i}`}>
            <span
              className="roll-glyph roll-out"
              style={{ animationDelay: `${i * STAGGER}ms` }}
            >
              {ch}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
