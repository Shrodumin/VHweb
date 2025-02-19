import React, { useEffect, useState} from "react";
import NavbarComponent from "../pages/Navbar";
import { Spinner } from "react-bootstrap";
import ContainerCard from "./ContainerCard";
import styles from "../styles/ServiceTab.module.css";

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
          <h1 className={styles.h1} style={{marginTop: "50px"}}>Lešení</h1>
          <p className={styles.serviceParagraph}>
            Pracujeme na tom
          </p>
        </ContainerCard>
      )};
      </div>
    );
  };

export default Leseni;