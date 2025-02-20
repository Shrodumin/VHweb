import { useEffect, useState } from "react";
import ContainerCard from "../components/ContainerCard";
import NavbarComponent from "./Navbar";
import styles from "../styles/Contacts.module.css";
import { Spinner } from "react-bootstrap";

function Contacts() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    const image = new window.Image();
    image.src = "/intro/intro.jpg";

    image.onload = () => setIsImageLoading(false); // Jakmile se obrázek načte
    image.onerror = () => setIsImageLoading(false); // I při chybě skryj spinner
  }, []);

  return (
    <>
      <NavbarComponent />
      {isImageLoading ? (
        <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
          </Spinner>
        </div>
      ) : (
        <ContainerCard image="/intro/intro.jpg" className={`d-flex justify-content-between `}
          style={{ minHeight: "100vh", paddingBottom: "50px" }}>
          <div className={`d-flex justify-content-between ${styles.cardStyle}`}>
            <div className={styles.paragraph}>
              <h1 style={{ textAlign: "left" }}>Kontakty</h1>
              <br />
              <h4>Mobil</h4>
              <ul>
                <li>
                  <a className={styles.a} href="tel:+420602545077">+420 602 545 077</a><br></br>
                </li>
                <li>
                  <a className={styles.a} href="tel:+420603859971">+420 603 859 971</a>
                </li>
              </ul>
              <h4>Telefon/Fax</h4>
              <ul>
                <li>
                  <a className={styles.a} href="420568620008">420 568 620 008</a>
                </li>
              </ul>
              <h4>E-mail</h4>
              <ul>
                <li>
                  <a className={styles.a} href="mailto:kopulety@mont-stav.cz">kopulety@mont-stav.cz</a><br></br>
                  <a className={styles.a} href="mailto:kancelar@mont-stav.cz">kancelar@mont-stav.cz</a>
                </li>
              </ul>
              <h4>Adresa</h4>
              Masarykovo nám. 105 <br />
              675 71, Náměšť nad Oslavou <br />
              <br />
              <b>IČ: </b>28263511 <br />
              <b>DIČ: </b>CZ28263511
            </div>
            <div className={styles.mapContainer}>
              {isIframeLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    zIndex: 1,
                  }}
                >
                  <Spinner animation="border" role="status">
                  </Spinner>
                </div>
              )}
              <iframe
                id="mapIframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.6209692604193!2d16.155093077471516!3d49.207749476056236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d5fd6782f8d65%3A0x391d47720f4842a!2zTWFzYXJ5a292byBuw6FtLiAxMDUsIDY3NSA3MSBOw6FtxJvFocWlIG5hZCBPc2xhdm91!5e0!3m2!1scs!2scz!4v1738887572680!5m2!1scs!2scz"
                className={styles.iframe}
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsIframeLoading(false)} // Jakmile se iframe načte
              />
            </div>
          </div>
        </ContainerCard>
      )}
    </>
  );
}

export default Contacts;
