import React, { useEffect, useState } from "react";
import NavbarComponent from "../pages/Navbar";
import { Spinner } from "react-bootstrap";
import ContainerCard from "./ContainerCard";
import styles from "../styles/ServiceTab.module.css";
import Footer from "./Footer";

const Rekonstrukce = () => {
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
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }}></Spinner>
        </div>
      ) : (
        <ContainerCard image="/intro/intro.jpg">
          <div className={styles.contentWrapper}>
            <div className={styles.textSection}>
              <h1 className={styles.h1}>Rekonstrukce</h1>
              <p className={styles.serviceParagraph}>
                Nejenom nové domy, ale i ty staré s příběhem, pro nás nejsou oříškem.
                Chcete si proházet místnosti v domě tak, že z komory bude koupelna?
                Vyměnit celé bytové jádro? Zateplit a udělat novou fasádu, nebo jenom
                udělat nové omítky uvnitř domu? Ani to pro nás není problém! Rádi Vám
                pomůžeme udělat ze starého nové. Rekonstrukci provádíme tak, aby byla
                funkční a ekonomicky přijatelná vždy po předchozí domluvě se
                zákazníkem. Rádi Vám poradíme tak, aby rekonstrukce byla co nejefektivnější
                a přesně dle Vašeho vkusu.
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

export default Rekonstrukce;
