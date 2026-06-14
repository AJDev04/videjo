import { useEffect, useRef, useState } from "react";

const STAGGER = 40; // ms tussen de letters
const DURATION = 460; // ms roll per letter (moet matchen met de CSS-transitie)

type Roll = { from: string; to: string } | null;

/**
 * Per-letter "roll": bij elke wijziging van `text` schuift het huidige woord
 * letter voor letter naar boven weg, terwijl het nieuwe woord er letter voor
 * letter van onderen omhoog inkomt.
 *
 * Twee lagen voorkomen dat de tekst "uitrekt": het inkomende woord staat in de
 * flow en bepaalt de breedte; het uitgaande woord ligt er absoluut overheen en
 * telt dus niet mee voor de breedte. Elke letter zit in een venster (overflow
 * hidden) en wordt alleen verticaal versschoven.
 */
export default function RollText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(text);
  const [roll, setRoll] = useState<Roll>(null);
  const [play, setPlay] = useState(false);
  const prev = useRef(text);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (text === prev.current) return;
    const from = prev.current;
    prev.current = text;
    timers.current.forEach(clearTimeout);

    setRoll({ from, to: text });
    setPlay(false);
    const slots = Math.max(from.length, text.length);
    // volgende frame de transitie aanzetten zodat hij pakt
    const t0 = window.setTimeout(() => setPlay(true), 30);
    // committen nadat de laatste letter is uitgerold
    const t1 = window.setTimeout(
      () => {
        setCurrent(text);
        setRoll(null);
        setPlay(false);
      },
      DURATION + slots * STAGGER + 60,
    );
    timers.current = [t0, t1];
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
      {/* inkomend woord — staat in de flow en bepaalt de breedte */}
      {[...roll.to].map((ch, i) => (
        <span className="roll-col" key={`in-${i}`}>
          <span
            className={`roll-glyph roll-in${play ? " play" : ""}`}
            style={{ transitionDelay: `${i * STAGGER}ms` }}
          >
            {ch}
          </span>
        </span>
      ))}
      {/* uitgaand woord — absoluut eroverheen, telt niet mee voor de breedte */}
      <span className="roll-out-layer" aria-hidden="true">
        {[...roll.from].map((ch, i) => (
          <span className="roll-col" key={`out-${i}`}>
            <span
              className={`roll-glyph roll-out${play ? " play" : ""}`}
              style={{ transitionDelay: `${i * STAGGER}ms` }}
            >
              {ch}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
