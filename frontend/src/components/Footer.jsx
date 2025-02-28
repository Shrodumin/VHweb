import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

function Footer() {
    return (
        <footer className={styles.footer}>
            <h2>Podporujeme:</h2>
            {/* Tři sloupce */}
            <div className={styles.footerContainer}>
                
                {/* 1. Sloupec */}
                <div className={styles.footerColumn}>
                    <a href="https://www.folkoveprazdniny.cz/"><p>Folkové prázdniny</p></a>          
                    <p>Náměšťský ples</p>
                    <a href="https://www.zamecky-vrch.cz/"><p>Závody do vrchu</p></a>
                </div>
                {/* 2. Sloupec */}
                <div className={styles.footerLogo}>
                    <Link to="https://forhelp-autismus.cz/">
                        <Image src="/otherLogos/logo_forhelp_dlouhe_tmave.svg" alt="For Help Autismus" style={{width: "200px"}}/>
                    </Link>
                    <Link to="https://ddklubicko.cz/">
                        <Image src="/otherLogos/logo1.jpg" alt="DD Klubicko" style={{width: "100px", height: "100px"}}/>
                    </Link>
                </div>
                {/* 3. Sloupec */}
                <div className={styles.footerLogo}>
                    <Link to="https://www.domovbezzamku.cz/">
                        <Image src="/otherLogos/DbZ.jpg" alt="Domov bez zámku" style={{width: "300px"}}/>
                    </Link>
                </div>
            </div>
        
            <div style={{marginTop: "20px"}}>
                2025 © VH MONT STAV s.r.o. Náměšť nad Oslavou
            </div>
            
        </footer>
    );
}

export default Footer;
