import React from "react";
import { Container, Card } from "react-bootstrap";
import styles from "../styles/ContainerCard.module.css";
import { useState, useEffect } from "react";

const ContainerCard = ({ children, image, style }) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 920);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 920);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardStyles = {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: isMobile ? "0px" : "20px",
    padding: "50px",
    width:"100%",
    height: isMobile ? "100vh" : "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <Container fluid style={{
      paddingTop: isMobile ? "0px" : "50px",
      paddingRight: isMobile ? "0px" : "20px",
      paddingBottom: isMobile ? "0px" : "20px",
      paddingLeft: isMobile ? "0px" : "20px",
      backgroundImage: `url('${image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "85vh",
      ...style,
    }}>
      <Card style={{
        ...cardStyles
      }}>
        {children}
      </Card>
    </Container>
  );
};

export default ContainerCard;