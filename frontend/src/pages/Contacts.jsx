import { useEffect, useState } from "react";
import ContainerCard from "../components/ContainerCard";
import NavbarComponent from "./Navbar";
import styles from "../styles/Contacts.module.css";
import { Card, Spinner } from "react-bootstrap";
import { FaHouse } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { FaMobile } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import Footer from "../components/Footer";

function Contacts() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    const image = new window.Image();
    image.src = "/intro/intro.jpg";

    image.onload = () => setIsImageLoading(false);
    image.onerror = () => setIsImageLoading(false);
  }, []);

  return (
    <>
      <NavbarComponent />
      {isImageLoading ? (
        <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }} />
        </div>
      ) : (
        <ContainerCard image="/intro/intro.jpg" className={styles.container}>

          {/* Hlavní kontejner pro karty a mapu */}
          <div className={styles.topSection}>

            {/* Grid kontejner pro karty */}
            <div className={styles.cardGrid}>
              <Card className={styles.contactCard}>
                <Card.Body>
                  <Card.Title>Adresa</Card.Title>
                  <Card.Text>
                    <FaHouse className={styles.icon} /> Masarykovo náměstí 105,<br />675 71, Náměšť nad Oslavou <br/>
                    <b>IČ:</b> 28263511 <br />
                    <b>DIČ:</b> CZ28263511 <br />
                    Společnost je zapsána v OR<br/> u Krajského soudu v Brně,<br/>spisová značka C 57230 
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className={styles.contactCard}>
                <Card.Body>
                  <Card.Title>Ing. Martin Kopuletý <br/> <br/>Technické dotazy, lešení, kalkulace</Card.Title>
                  <Card.Text>
                  <br/>
                    <FaMobile className={styles.icon} /> <a href="tel:+420602545077">+420 602 545 077</a><br />
                    <CiMail className={styles.icon} /> <a href="mailto:kopulety@mont-stav.cz">kopulety@mont-stav.cz</a>
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className={styles.contactCard}>
                <Card.Body>
                  <Card.Title>Kancelář <br/> <br/>Objednávky, fakturace, půjčovna</Card.Title>
                  <Card.Text>
                  <br/>
                    <FaMobile className={styles.icon} /> <a href="tel:+420603859971">+420 603 859 971</a><br />
                    <BsFillTelephoneFill className={styles.icon} /> <a href="tel:420568620008">420 568 620 008</a><br />
                    <CiMail className={styles.icon} /> <a href="mailto:kancelar@mont-stav.cz">kancelar@mont-stav.cz</a>
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className={styles.contactCard}>
                <Card.Body>
                  <Card.Title>Skladové prostory</Card.Title>
                  <Card.Text>
                    Újezd u Rosic ev. č. 26<br />
                    66484 Újezd u Rosic
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            {/* Mapa vedle karet na PC, pod kartami na mobilu */}
            <div className={styles.mapContainer}>
              {isIframeLoading && (
                <div className={styles.spinnerOverlay}>
                  <Spinner animation="border" role="status" />
                </div>
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.6209692604193!2d16.155093077471516!3d49.207749476056236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d5fd6782f8d65%3A0x391d47720f4842a!2zTWFzYXJ5a292byBuw6FtLiAxMDUsIDY3NSA3MSBOw6FtxJvFocWlIG5hZCBPc2xhdm91!5e0!3m2!1scs!2scz!4v1738887572680!5m2!1scs!2scz"
                className={styles.iframe}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsIframeLoading(false)}
              />
            </div>
          </div>

        </ContainerCard>
      )}
      <Footer />
    </>
  );
}

export default Contacts;