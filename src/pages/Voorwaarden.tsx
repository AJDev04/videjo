import Seo from "../components/Seo";
import SmartLink from "../components/SmartLink";
import voorwaardenCss from "../../css/voorwaarden.css?inline";

export const Component = () => (
  <>
    <Seo
      title="Algemene Voorwaarden | VIDEJO"
      description="De algemene voorwaarden van VIDEJO voor offertes, overeenkomsten en leveringen."
      canonical="https://videjo.be/voorwaarden"
      pageCss={voorwaardenCss}
    />

    <SmartLink className="back-link" to="/">
      ← Terug naar VIDEJO
    </SmartLink>

    <div className="page-wrapper">
      <div className="page-header">
        <p className="label">Juridisch — Contractuele voorwaarden</p>
        <h1>Algemene Voorwaarden</h1>
        <p className="last-updated">Versie 1.0 — mei 2026</p>
      </div>

      <div className="intro-block">
        Deze algemene voorwaarden zijn van toepassing op alle offertes,
        overeenkomsten en leveringen van VIDEJO. Door een offerte te aanvaarden of
        een samenwerking aan te gaan, verklaart de opdrachtgever zich akkoord met
        deze voorwaarden.
      </div>

      <div className="toc">
        <p>Inhoud</p>
        <ol>
          <li><SmartLink to="#art1">Definities</SmartLink></li>
          <li><SmartLink to="#art2">Toepasselijkheid</SmartLink></li>
          <li><SmartLink to="#art3">Offertes en totstandkoming</SmartLink></li>
          <li><SmartLink to="#art4">Uitvoering van de opdracht</SmartLink></li>
          <li><SmartLink to="#art5">Verplichtingen opdrachtgever</SmartLink></li>
          <li><SmartLink to="#art6">Betalingsvoorwaarden</SmartLink></li>
          <li><SmartLink to="#art7">Annulering en wijzigingen</SmartLink></li>
          <li><SmartLink to="#art8">Intellectuele eigendom</SmartLink></li>
          <li><SmartLink to="#art9">Aansprakelijkheid</SmartLink></li>
          <li><SmartLink to="#art10">Vertrouwelijkheid</SmartLink></li>
          <li><SmartLink to="#art11">Toepasselijk recht en geschillen</SmartLink></li>
        </ol>
      </div>

      <div className="section" id="art1">
        <h2>01 — Definities</h2>
        <ul>
          <li><strong>VIDEJO:</strong> de vennootschap van Joren Frederickx en Alexandre Rutkowski, gevestigd te Dilbeek (1700), België. BTW-nummer: BE1037894456.</li>
          <li><strong>Opdrachtgever:</strong> elke natuurlijke of rechtspersoon die een overeenkomst aangaat met VIDEJO.</li>
          <li><strong>Opdracht:</strong> alle werkzaamheden waartoe VIDEJO opdracht heeft gekregen, waaronder videoproductie, -editing, drone-opnames en motion graphics.</li>
          <li><strong>Eindproduct:</strong> het geleverde audiovisuele materiaal na afronding van de opdracht.</li>
        </ul>
      </div>

      <div className="section" id="art2">
        <h2>02 — Toepasselijkheid</h2>
        <p>
          Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes,
          overeenkomsten en leveringen van VIDEJO, tenzij uitdrukkelijk
          schriftelijk anders overeengekomen. Afwijkende voorwaarden van de
          opdrachtgever worden enkel aanvaard indien VIDEJO deze schriftelijk
          bevestigt.
        </p>
      </div>

      <div className="section" id="art3">
        <h2>03 — Offertes en totstandkoming</h2>
        <p>
          Alle offertes van VIDEJO zijn vrijblijvend en geldig gedurende{" "}
          <strong>30 dagen</strong> na verzending, tenzij anders vermeld. Een
          overeenkomst komt tot stand op het moment dat de opdrachtgever de offerte
          schriftelijk (per e-mail of ondertekend document) aanvaardt.
        </p>
        <p>
          VIDEJO behoudt zich het recht voor een opdracht te weigeren zonder opgave
          van reden.
        </p>
      </div>

      <div className="section" id="art4">
        <h2>04 — Uitvoering van de opdracht</h2>
        <p>
          VIDEJO verbindt zich ertoe de opdracht uit te voeren met de nodige zorg
          en vakmanschap, conform de afspraken vastgelegd in de offerte of
          overeenkomst.
        </p>
        <ul>
          <li>Levertermijnen zijn indicatief, tenzij uitdrukkelijk als bindend overeengekomen.</li>
          <li>VIDEJO mag derden inschakelen voor de uitvoering van de opdracht.</li>
          <li>Meerwerk buiten de initiële opdracht wordt steeds vooraf besproken en apart gefactureerd.</li>
        </ul>
      </div>

      <div className="section" id="art5">
        <h2>05 — Verplichtingen opdrachtgever</h2>
        <p>
          De opdrachtgever staat in voor het tijdig aanleveren van alle benodigde
          informatie, materialen en toegangen die noodzakelijk zijn voor de
          uitvoering van de opdracht. Vertraging door laattijdige aanlevering is
          niet de verantwoordelijkheid van VIDEJO en kan geen aanleiding geven tot
          schadevergoeding.
        </p>
      </div>

      <div className="section" id="art6">
        <h2>06 — Betalingsvoorwaarden</h2>
        <p>
          Facturen dienen betaald te worden binnen{" "}
          <strong>14 kalenderdagen</strong> na factuurdatum, tenzij anders
          overeengekomen. VIDEJO hanteert standaard het volgende betalingsschema:
        </p>
        <div className="highlight-block">
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>50%</strong> voorschot bij aanvaarding van de offerte
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>50%</strong> saldo bij oplevering van het eindproduct
          </p>
        </div>
        <p>
          Bij niet-tijdige betaling is van rechtswege en zonder ingebrekestelling
          een verwijlintrest verschuldigd van <strong>10% per jaar</strong>, alsook
          een forfaitaire schadevergoeding van{" "}
          <strong>10% op het openstaande bedrag</strong> (minimaal €50).
        </p>
        <p>
          VIDEJO behoudt zich het recht voor de werkzaamheden op te schorten zolang
          een factuur onbetaald blijft.
        </p>
      </div>

      <div className="section" id="art7">
        <h2>07 — Annulering en wijzigingen</h2>
        <p>Bij annulering door de opdrachtgever zijn de volgende kosten verschuldigd:</p>
        <ul>
          <li><strong>Meer dan 14 dagen voor opnamedatum:</strong> 25% van de totale projectwaarde</li>
          <li><strong>Tussen 7 en 14 dagen voor opnamedatum:</strong> 50% van de totale projectwaarde</li>
          <li><strong>Minder dan 7 dagen voor opnamedatum:</strong> 100% van de totale projectwaarde</li>
        </ul>
        <p>
          Wijzigingen aan de opdracht na goedkeuring worden steeds schriftelijk
          vastgelegd en kunnen leiden tot een aanpassing van de prijs en/of
          levertermijn.
        </p>
      </div>

      <div className="section" id="art8">
        <h2>08 — Intellectuele eigendom</h2>
        <p>
          Na volledige betaling draagt VIDEJO de gebruiksrechten op het eindproduct
          over aan de opdrachtgever voor het overeengekomen gebruik.
        </p>
        <ul>
          <li>VIDEJO behoudt te allen tijde het recht het eindproduct te gebruiken in zijn portfolio, op sociale media en voor promotionele doeleinden, tenzij uitdrukkelijk schriftelijk anders overeengekomen.</li>
          <li>Alle rechten op tussentijds werk, ruwe beelden, ongebruikte opnames en projectbestanden blijven eigendom van VIDEJO.</li>
          <li>Hergebruik van het geleverde materiaal voor andere doeleinden dan overeengekomen vereist schriftelijke toestemming van VIDEJO.</li>
        </ul>
      </div>

      <div className="section" id="art9">
        <h2>09 — Aansprakelijkheid</h2>
        <p>VIDEJO is niet aansprakelijk voor:</p>
        <ul>
          <li>Indirecte schade, gevolgschade of gederfde inkomsten van de opdrachtgever</li>
          <li>Schade door overmacht (weersomstandigheden, ziekte, technische storingen, e.d.)</li>
          <li>Verlies of beschadiging van door de opdrachtgever aangeleverde materialen</li>
        </ul>
        <p>
          De aansprakelijkheid van VIDEJO is in elk geval beperkt tot het bedrag
          van de desbetreffende factuur.
        </p>
      </div>

      <div className="section" id="art10">
        <h2>10 — Vertrouwelijkheid</h2>
        <p>
          Beide partijen verbinden zich ertoe vertrouwelijke informatie die zij in
          het kader van de samenwerking ontvangen, niet aan derden mee te delen
          zonder voorafgaande schriftelijke toestemming. Deze verplichting blijft
          gelden na beëindiging van de overeenkomst.
        </p>
      </div>

      <div className="section" id="art11">
        <h2>11 — Toepasselijk recht en geschillen</h2>
        <p>
          Op alle overeenkomsten tussen VIDEJO en de opdrachtgever is het{" "}
          <strong>Belgisch recht</strong> van toepassing. Bij geschillen zijn
          uitsluitend de rechtbanken van het{" "}
          <strong>arrondissement Brussel</strong> bevoegd, tenzij partijen
          schriftelijk een andere regeling overeenkomen.
        </p>
        <p>
          Partijen verbinden zich ertoe om vóór gerechtelijke stappen een minnelijke
          schikking na te streven via overleg.
        </p>
      </div>

      <div className="footer-note">
        <span>© 2026 VIDEJO. Alle rechten voorbehouden.</span>
        <span>BTW BE1037894456 — Dilbeek, België — Belgisch recht</span>
      </div>
    </div>
  </>
);
