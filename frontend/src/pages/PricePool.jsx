import NavbarComponent from "./Navbar";
import styles from "../styles/PricePool.module.css"; // Přidej styl

function PricePool() {
    return (
        <>
            <NavbarComponent />
            <div className={styles.pdfContainer}>
                <object className={styles.pdfViewer} data="/2024_Prices.pdf"></object>
            </div>
        </>
    );
}

export default PricePool;
