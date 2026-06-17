import React, { useState, useEffect } from "react"; // Přidán useEffect a useState
import NavbarComponent from "./Navbar";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../../public/2026_Prices.pdf";

function PricePool() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  // Inicializace stavu pro scale (výchozí 1 pro mobil)
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    // Funkce, která zkontroluje šířku okna a upraví scale
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setPageWidth(800); // Větší měřítko pro PC / tablety
      }
      else if (window.innerWidth > 480) {
        setPageWidth(500);
      } else {
        setPageWidth(380);   // Normální měřítko pro mobily
      }
    };

    // Spustíme hned při načtení
    handleResize();

    // Přidáme posluchač na změnu velikosti okna
    window.addEventListener("resize", handleResize);

    // Vyčištění posluchače při odpojení komponenty
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const outerWrapperStyle = {
    width: "100%",
    overflowX: "auto",      
    padding: "20px 50px",
    boxSizing: "border-box",
  };

  const innerCenteredStyle = {
    maxWidth: "800px",      
    width: "100%",          
    margin: "0 auto",       
  };

  return (
    <>
      <NavbarComponent />

      {/* První dokument */}
      <div style={outerWrapperStyle}>
        <div style={innerCenteredStyle}>
          <Document file={pdf} >
            {/* Vlastnost scale přesunuta na <Page> a řízena proměnnou pdfScale */}
            <Page width={pageWidth} pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
            <Page width={pageWidth} pageNumber={2} renderTextLayer={false} renderAnnotationLayer={false} />
            <Page width={pageWidth} pageNumber={3} renderTextLayer={false} renderAnnotationLayer={false} />
            <Page width={pageWidth} pageNumber={4} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        </div>
      </div>

      <div style={{ height: "20px" }}></div>

      {/* Druhý dokument */}
      <div style={outerWrapperStyle}>
        <div style={innerCenteredStyle}>
          <Document file={pdf}>
            <Page width={pageWidth} pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
            <Page width={pageWidth} pageNumber={2} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        </div>
      </div>
    </>
  );
}

export default PricePool;