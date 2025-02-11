import { useEffect, useState } from "react";
import api from "../api";
import NavbarComponent from "./Navbar";
import '../styles/Home.css'
import { Link } from "react-router-dom";
import React from "react";
import { Image } from "react-bootstrap";


function Home(){
    const [realisations, setRealisations] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
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
            <div className="intro-container">
                <img src="http://localhost/images/intro/intro.jpg" alt="Logo" className="img-fluid" />
                <div className="d-flex justify-content-center align-items-center ">
                    <h1 className="text-white intro-title">STAVEBNÍ PRÁCE</h1>
                </div>
            </div>
            <h1 className="text-center" style={{marginTop: "50px"}}>O nás</h1>
            <div className="container" style={{marginTop: "50px", marginBottom: "50px"}}>
                <div className="row">
                    <div className="col-md-6">
                        <p className="text-justify" style={{textAlign: "justify"}}>Firma byla založena v roce 1991 panem Vladimírem Hvězdou. 
                            Od roku 2008 provozujeme stavební činnost pod názvem VH MONT-STAV s.r.o. 
                            Patříme mezi menší stavební firmy se sídlem v Náměšti nad Oslavou a působností zejména v kraji Vysočina.
                        </p>
                        <p className="text-justify" style={{textAlign: "justify"}}>
                            <b>Specializujeme se na: </b>{realisations.map((realisation, index) => (
                                <React.Fragment key={index}>
                                    <Link to={`/realisations/${realisation.id}/posts`}>
                                      {realisation.title}
                                    </Link>
                                    {index < realisations.length - 2 ? ", " : index === realisations.length - 2 ? " a " : "."}
                                </React.Fragment>
                            ))}
                        </p>
                            
                    </div>
                    <div className="col-md-6">
                        <Image src="http://localhost/images/intro/intro2.jpg" alt="Image" fluid rounded/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home