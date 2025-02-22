import React, { useEffect, useState} from "react";
import NavbarComponent from "../pages/Navbar";
import { Spinner } from "react-bootstrap";
import ContainerCard from "./ContainerCard";
import styles from "../styles/ServiceTab.module.css";
import Footer from "./Footer";

const Mechanizace = () => {

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
        ): (
          <ContainerCard image="/intro/intro.jpg">
          <div className={styles.contentWrapper}>
            <div className={styles.textSection}>
              <h1 className={styles.h1}>Mechanizace</h1>
              <p className={styles.serviceParagraph}>
              V oblasti mechanizace je naše firma v tomto ohledu plně soběstačná a
              jsme tak schopni provádět velké množství prací bez nutnosti objednávky
              dalších služeb. Velké stroje s obsluhou (ale i malé bez obsluhy) nabízíme
              také k pronájmu za příznivé ceny. Pokud máte šikovné ruce, ale
              k dokončení vašeho snu vám chybí pouze stroj nebo nářadí, neváhejte nás
              kontaktovat.
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

export default Mechanizace;