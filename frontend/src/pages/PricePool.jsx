import React from "react";
import NavbarComponent from "./Navbar";
import styles from "../styles/PricePool.module.css";

function PricePool() {
  const pdfUrl = "/2024_Prices.pdf"; // Cesta k souboru

  return (
    <>
      <NavbarComponent />
      <div className={styles.pdfContainer}>
        {/* Desktop: Použití <object> */}
        <object className={styles.pdfViewer} data={pdfUrl} type="application/pdf">
          {/* Pokud prohlížeč nepodporuje <object>, zobrazí se alternativa */}
          <p>Váš prohlížeč nepodporuje zobrazování PDF. <a href={pdfUrl} download>Stáhněte si PDF zde.</a></p>
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