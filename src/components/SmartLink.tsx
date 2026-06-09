import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "../lib/lenis";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
  /** Wordt aangeroepen nadat een interne klik is afgehandeld (bv. menu sluiten). */
  onNavigate?: () => void;
};

function split(to: string): [path: string, hash: string] {
  const i = to.indexOf("#");
  if (i === -1) return [to, ""];
  return [to.slice(0, i), to.slice(i)];
}

/**
 * Link die zowel client-side route-navigatie als in-page hash-scrollen met
 * Lenis (80px header-offset, zoals de oude smooth-scroll) afhandelt. Externe
 * http-links en modifier-clicks worden met rust gelaten (standaardgedrag).
 */
export default function SmartLink({ to, children, onNavigate, ...rest }: Props) {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  const isExternal = /^https?:\/\//.test(to) || to.startsWith("mailto:") || to.startsWith("tel:");
  const [path, hash] = split(to);
  const href = to.startsWith("#") ? to : to;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isExternal) return;
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();

    const samePage = path === "" || path === location.pathname;
    if (hash && samePage) {
      const el = document.querySelector(hash);
      if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
      else if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      onNavigate?.();
      return;
    }
    navigate(to.startsWith("#") ? location.pathname + to : to);
    onNavigate?.();
  };

  if (isExternal) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
