import type { ReactNode } from "react";
import tabSectionCss from "./TabSection.css?inline";

/**
 * Cream sectie met een navy "tab" linksboven (gele uppercase titel + holle hoek
 * die naar de cream overgaat). De tab sluit naadloos aan op de navy hero erboven.
 * Gedeeld door o.a. de Klanten- (Projecten) en Expertise-secties; `children` is
 * de inhoud onder de tab (mag leeg zijn).
 */
export default function TabSection({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="tab-section">
      <style dangerouslySetInnerHTML={{ __html: tabSectionCss }} />
      <div className="tab-section-tab">
        <h2 className="tab-section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}
