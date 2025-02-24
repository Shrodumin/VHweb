import React from "react";
import styles from "../styles/Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <h2>Podporujeme:</h2>
            {/* Tři sloupce */}
            <div className={styles.footerContainer}>
                
                {/* 1. Sloupec */}
                <div className={styles.footerColumn}>
                    
                    <a href="https://ddklubicko.cz/"><p>Dětský domov Náměšť nad Oslavou</p></a>
                    <a href="https://www.folkoveprazdniny.cz/"><p>Folkové prázdniny</p></a>          
                    <p>Náměšťský ples</p>
                </div>
                {/* 2. Sloupec */}
                <div className={styles.footerColumn}>
                    <a href="https://www.zamecky-vrch.cz/"><p>Závody do vrchu</p></a>
                    <a href="https://forhelp-autismus.cz/"><p>For Help Autismus</p></a>
                    <p>Charitativní ples Domova bez zámku</p>
                </div>
                
            </div>
            2025 © VH Mont Stav s.r.o. Náměšť nad Oslavou
        </footer>
    );
}

export default Footer;
