import ContainerCard from "../components/ContainerCard"
import NavbarComponent from "./Navbar"
import "../styles/Contacts.css"

function Contacts(){
    return (
        <>
            <NavbarComponent/>
            <ContainerCard
                image="/intro/intro.jpg"
                className="d-flex justify-content-between"
            >
                <div className="d-flex justify-content-between" style={{width: "100%", height: "100%", padding: "100px"}}>
                    <div style={{width: "40%"}}>
                        <h1 style={{textAlign:"left"}}>Kontakty</h1>
                        <br></br>
                        <h4>Mobil</h4>
                        <ul>
                            <li>
                                <a href="tel:+420602545077">+420 602 545 077</a>
                            </li>
                        </ul>
                        <h4>E-mail</h4>
                        <ul>
                            <li>
                                <a href="mailto:kancelar@mont-stav.cz">kancelar@mont-stav.cz</a>
                            </li>
                        </ul>
                        <h4>Adresa</h4>
                        Masarykovo nám. 105 <br></br>
                        675 71, Náměšť nad Oslavou <br></br>
                        <br></br>
                        <b>IČ: </b>28263511 <br></br>
                        <b>DIČ: </b>CZ28263511
                    </div>
                    <div style={{width: "60%"}}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.6209692604193!2d16.155093077471516!3d49.207749476056236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d5fd6782f8d65%3A0x391d47720f4842a!2zTWFzYXJ5a292byBuw6FtLiAxMDUsIDY3NSA3MSBOw6FtxJvFocWlIG5hZCBPc2xhdm91!5e0!3m2!1scs!2scz!4v1738887572680!5m2!1scs!2scz" 
                            width="80%" 
                            height="80%" 
                            style={{border: "0"}} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </ContainerCard>
        </>
    )
}

export default Contacts