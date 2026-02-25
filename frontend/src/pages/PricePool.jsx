import React from "react";
import NavbarComponent from "./Navbar";
import styles from "../styles/PricePool.module.css";

function PricePool() {
  const pdfUrl = "/2026_Prices.pdf"; // Cesta k souboru
  const norms = "/normy.pdf";
  const formFile = "/Zakazkovy_formular.pdf";

  return (
    <>
      <NavbarComponent />
      <div className={styles.pdfContainer}>
        {/* Desktop: Použití <object> */}
        <object className={styles.pdfViewer} data={pdfUrl} type="application/pdf">
          {/* Pokud prohlížeč nepodporuje <object>, zobrazí se alternativa */}
          <p>Váš prohlížeč nepodporuje zobrazování PDF. <a href={pdfUrl} download>Ceník ke stažení zde</a></p>
        </object>

        {/* Mobil: Alternativní odkaz ke stažení PDF */}
        <a href={pdfUrl} className={styles.mobilePdfLink} download>
          Klikněte zde pro stažení PDF
        </a>
      </div>
      <div className={styles.pdfContainer}>
        {/* Desktop: Použití <object> */}
        <object className={styles.pdfViewer} data={norms} type="application/pdf">
          {/* Pokud prohlížeč nepodporuje <object>, zobrazí se alternativa */}
          <p>Váš prohlížeč nepodporuje zobrazování PDF. <a href={norms} download>Normy ke stažení zde</a></p>
        </object>

        {/* Mobil: Alternativní odkaz ke stažení PDF */}
        <a href={pdfUrl} className={styles.mobilePdfLink} download>
          Klikněte zde pro stažení PDF
        </a>
      </div>
      <div className={styles.pdfContainer}>
        {/* Desktop: Použití <object> */}
        <object className={styles.pdfViewer} data={formFile} type="application/pdf">
          {/* Pokud prohlížeč nepodporuje <object>, zobrazí se alternativa */}
          <p>Váš prohlížeč nepodporuje zobrazování PDF. <a href={formFile} download>Formulář ke stažení zde</a></p>
        </object>

        {/* Mobil: Alternativní odkaz ke stažení PDF */}
        <a href={pdfUrl} className={styles.mobilePdfLink} download>
          Klikněte zde pro stažení PDF
        </a>
      </div>
    </>
  );
}

export default PricePool;