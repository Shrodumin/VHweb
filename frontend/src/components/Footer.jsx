import React from "react";
import styles from "../styles/Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Tři sloupce */}
            <div className={styles.footerContainer}>
                {/* 1. Sloupec */}
                <div className={styles.footerColumn}>
                    <h3>Podporujeme:</h3>
                    <p>Dětský domov Náměšť nad Oslavou</p>
                    <p>Folkové prázdniny</p>
                    <p>Závody do vrchu</p>
                    <p>For Help Autismus</p>
                    <p>Náměšťský ples</p>
                    <p>Charitativní ples Domova bez zámku</p>
                </div>

                {/* 2. Sloupec */}
                <div className={styles.footerColumn}>
                    <h3>E-maily:</h3>
                    <p><a className={styles.footerHref} href="mailto:kopulety@mont-stav.cz">kopulety@mont-stav.cz</a><br />Ing. Martin Kopuletý</p>
                    <p><a className={styles.footerHref} href="mailto:kancelar@mont-stav.cz">kancelar@mont-stav.cz</a><br />Kancelář</p>
                </div>

                {/* 3. Sloupec - Kontakty */}
                <div className={styles.footerColumn}>
                    <h3>Telefon:</h3>
                    <p><a className={styles.footerHref} href="tel:+420602545077">+420 602 545 077</a><br />Ing. Martin Kopuletý</p>
                    <p><a className={styles.footerHref} href="tel:+420603859971">+420 603 859 971</a><br />Kancelář</p>
                </div>

                {/* 4. Sloupec - Adresa */}
                <div className={styles.footerColumn}>
                    <h3>Adresa:</h3>
                    <p>Masarykovo náměstí 1089<br />Náměšť nad Oslavou</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
