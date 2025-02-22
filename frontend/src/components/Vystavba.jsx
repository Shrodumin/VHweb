import React, { useEffect, useState } from "react";
import NavbarComponent from "../pages/Navbar";
import { Spinner } from "react-bootstrap";
import ContainerCard from "./ContainerCard";
import styles from "../styles/ServiceTab.module.css";
import Footer from "./Footer";

const Vystavba = () => {
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
        <ContainerCard
        image="/intro/intro.jpg"
        style={{
          height: "100vh"
        }}
      >
        <h1 className={styles.h1} style={{marginTop: "50px"}}>Výstavba</h1>
        <p className={styles.serviceParagraph}>
        Chcete postavit dům? Rádi Vám s tím pomůžeme a splníme Vám Váš sen.
        Naší doménou však není pouze výstavba rodinných domů na klíč.
        Zabýváme se také dílčími projekty jako jsou výstavby betonových plotů,
        zámkové dlažby, příjezdové cesty, sklepy, garáže, zateplení, fasády a
        nebo pouze hrubá stavba či základová deska. Sen totiž nemusí být pouze
        celý dům, ale třeba jenom jeho část a my Vám s tím rádi pomůžeme. <br></br><br></br>Jste
        šikovní a chtěli byste se na svém snu podílet sami vlastními silami a
        zároveň tím nějakou korunu ušetřit? S námi můžete přiložit ruku k dílu a
        kde co si udělat sami, všechno je to o domluvě a u nás to není překážkou.
        </p>
      </ContainerCard>
      
      )}
      <Footer />
    </div>
  );
};

export default Vystavba;