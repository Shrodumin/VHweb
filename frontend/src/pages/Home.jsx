import { useEffect, useState } from "react";
import NavbarComponent from "./Navbar";
import "../styles/Home.css";
import { Image, Spinner } from "react-bootstrap";
import api from "../api";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
          </Spinner>
        </div>
      ) : (
        <>
          <div className="intro-container">
            <img src="/intro/intro.jpg" alt="Logo" className="img-fluid" />
            <div className="d-flex justify-content-center align-items-center">
              <h1 className="text-white intro-title">Společně vytvoříme váš domov</h1>
            </div>
          </div>
          <h1 className="text-center" style={{ marginTop: "50px" }}>O nás</h1>
          <div className="container" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <div className="row">
              <div className="col-md-6">
                <p className="text-justify" style={{ textAlign: "justify" }}>
                  Jsme rodinná stavební firma se zkušenostmi přesahující generaci. Naším
                  hlavním heslem je: „Společně vytvoříme váš domov“. Ať už si pod slovem
                  domov představíte cokoliv, pro nás nic není překážkou. Rádi se podílíme na
                  nové výstavbě, ale také na rekonstrukci vašich stávajících domovů. Naše
                  firma se pohybuje nejen na soukromých projektech, ale také v oblasti
                  veřejného sektoru. Rodinné prostředí se prolíná celou naší společností. Naší
                  součástí je i začleňování znevýhodněných skupin zaměstnanců, čímž se jim
                  snažíme zlepšit jejich životní situaci. Stejně tak tomu je při podpoře lokálních
                  událostí a neziskových organizací.
                </p>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center mt-4 mt-md-0">
                <Image src="/intro/intro2.jpg" alt="Image" fluid rounded />
              </div>
            </div>
          </div>
          <Footer/>
        </>
      )}
    </>
  );
}

export default Home;
