import React, { useEffect, useState } from "react";
import NavbarComponent from "../pages/Navbar";
import { Spinner } from "react-bootstrap";
import ContainerCard from "./ContainerCard";
import "../styles/ServiceTab.css";

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
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <ContainerCard
          image="/intro/intro.jpg"
        >
          <h1 style={{ marginTop: "50px" }}>Rekonstrukce rodinných domů</h1>
          <p style={{ padding: "50px", marginLeft: "50px", marginRight: "50px" }}>
            lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem
            ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus
            lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem
            ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus lorem ipus
          </p>
        </ContainerCard>
      )}
    </div>
  );
};

export default Rekonstrukce;
