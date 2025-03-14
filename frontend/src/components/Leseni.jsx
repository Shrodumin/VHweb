import React, { useEffect, useState} from "react";
import NavbarComponent from "../pages/Navbar";
import { Spinner } from "react-bootstrap";
import ContainerCard from "./ContainerCard";
import styles from "../styles/ServiceTab.module.css";
import Footer from "./Footer";

const Leseni = () => {
    const [isImageLoading, setIsImageLoading] = useState(true); // Stav načítání
      
    useEffect(() => {
      const image = new window.Image();
      image.src = "/intro/intro.jpg";

      image.onload = () => setIsImageLoading(false); // Načtení obrázku
      image.onerror = () => setIsImageLoading(false); // I při chybě skryj spinner
    }, []);

    return (
      <div>
        <NavbarComponent />
        {isImageLoading ? (
        <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
          </Spinner>
        </div>
      ) : (
        <ContainerCard
          style={{
            height: "100vh"
          }}
          image="/intro/intro.jpg"
        >
          <div className={styles.contentWrapper}>
            <div className={styles.textSection}>
              <h1 className={styles.h1}>Lešení</h1>
                <p className={styles.serviceParagraph}>
                  Nabízíme krátkodobý i dlouhodobý pronájem lešení přesahující i 1000 m<sup>2</sup>,
                  lešení o 50 m<sup>2</sup> pro nás však není problém. Nejprve technik provede
                  nákres a předběžnou kalkulaci na místě stavby, poté Vám lešení typu RUX
                  dovezeme na místo, postavíme, zajistíme bezpečnost a po provedení díla
                  opět demontujeme a odvezeme. Pokud si však chcete lešení odvést a
                  postavit svépomocí rádi Vám ho vypůjčíme přímo z našeho skladu.
                </p>
                </div>
                <div className={styles.imageSection}>
                  <img src="/intro/intro.jpg" alt="Rekonstrukce" className={styles.image} />
                </div>
              </div>
        </ContainerCard>
      )}
      <Footer />
      </div>
    );
  };

export default Leseni;