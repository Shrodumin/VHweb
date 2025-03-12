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
                    <Link to="https://www.zamecky-vrch.cz/">
                        <Image src="/otherLogos/zdv.jpg" alt="Závody do vrchu" style={{width: "200px"}}/>
                    </Link>
                </div>
                {/* 2. Sloupec */}
                <div className={styles.footerLogo}>
                    <Link to="https://forhelp-autismus.cz/">
                        <Image src="/otherLogos/logo_forhelp_dlouhe_tmave.svg" alt="For Help Autismus" style={{width: "200px"}}/>
                    </Link>
                    
                </div>
                {/* 3. Sloupec */}
                <div className={styles.footerLogo}>
                    <Link to="https://ddklubicko.cz/">
                        <Image src="/otherLogos/logo1.jpg" alt="DD Klubicko" style={{width: "100px", height: "100px"}}/>
                    </Link>
                </div>
                <div className={styles.footerLogo}>
                    <Link to="https://www.domovbezzamku.cz/">
                        <Image src="/otherLogos/DbZ.jpg" alt="Domov bez zámku" style={{width: "300px"}}/>
                    </Link>
                </div>
                <div className={styles.footerLogo}>
                    <Link to="https://www.folkoveprazdniny.cz/">
                        <Image src="/otherLogos/FP2025.jpg" alt="Folkové prázdniny" style={{width: "100px"}}/>
                    </Link>
                </div>
                <div className={styles.footerLogo}>
                    <Link to="https://mks-namest.cz/xxiv-namestsky-ples/g-6600">
                        <Image src="/otherLogos/ples.jpg" alt="Náměšťský ples" style={{width: "150px"}}/>
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
