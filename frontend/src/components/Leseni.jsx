import React from "react";
import NavbarComponent from "../pages/Navbar";
import { Container, Card } from "react-bootstrap";
import ContainerCard from "./ContainerCard";
import "../styles/ServiceTab.css";

const Leseni = () => {
    return (
      <div>
        <NavbarComponent />
        <ContainerCard
          image="/intro/intro.jpg"
          style={{
            // additional styles for the container
          }}
        >
          <h1 style={{marginTop: "50px"}}>Lešení</h1>
          <p style={{padding: "50px", marginLeft: "50px", marginRight: "50px"}}>
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
            lorem ipus
          </p>
        </ContainerCard>
      </div>
    );
  };

export default Leseni;