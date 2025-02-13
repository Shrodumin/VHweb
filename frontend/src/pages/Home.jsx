import { useEffect, useState } from "react";
import NavbarComponent from "./Navbar";
import "../styles/Home.css";
import { Image, Spinner } from "react-bootstrap";
import api from "../api";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isLoading, setIsLoading] = useState(true); // Stav načítání
  const [realisations, setRealisations] = useState([]);

  useEffect(() => {
    const staticImages = ["/intro/intro.jpg", "/intro/intro2.jpg"]; // Cesty ke všem obrázkům

    const loadImages = staticImages.map((src) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve; // Zavolá resolve, když se obrázek načte
        img.onerror = resolve; // Zavolá resolve i při chybě (aby to nezablokovalo aplikaci)
      });
      
    });

    // Počkej, až se všechny obrázky načtou, a pak skryj spinner
    Promise.all(loadImages).then(() => setIsLoading(false));
    getRealisations();
    
  }, []);

  const getRealisations = () => {
    api
        .get("/api/realisations/")
        .then((res) => res.data) 
        .then((data) => setRealisations(data))
        .catch((err) => alert(err));
}


  return (
    <>
      <NavbarComponent />
      {isLoading ? (
        <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="intro-container">
            <img src="/intro/intro.jpg" alt="Logo" className="img-fluid" />
            <div className="d-flex justify-content-center align-items-center">
              <h1 className="text-white intro-title">STAVEBNÍ PRÁCE</h1>
            </div>
          </div>
          <h1 className="text-center" style={{ marginTop: "50px" }}>O nás</h1>
          <div className="container" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <div className="row">
              <div className="col-md-6">
                <p className="text-justify">
                  Firma byla založena v roce 1991 panem Vladimírem Hvězdou. Od roku 2008 provozujeme stavební činnost pod názvem VH MONT-STAV s.r.o. Patříme mezi menší stavební firmy se sídlem v Náměšti nad Oslavou a působností zejména v kraji Vysočina.
                </p>
                <p className="text-justify">
                  <b>Specializujeme se na:</b> {realisations.map((realisation, index) => (
                    <React.Fragment key={index}>
                      <Link to={`/realisations/${realisation.id}/posts`}>{realisation.title}</Link>
                      {index < realisations.length - 2 ? ", " : index === realisations.length - 2 ? " a " : "."}
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <div className="col-md-6">
                <Image src="/intro/intro2.jpg" alt="Image" fluid rounded />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
