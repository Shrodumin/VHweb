import React from "react";
import { Container, Card } from "react-bootstrap";

const ContainerCard = ({ children, image, style }) => {
  return (
    <Container fluid style={{
      paddingTop: "50px",
      backgroundImage: `url('${image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      ...style,
    }}>
      <Card style={{
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: "20px",
        padding: "20px",
        width: "85%",
        margin: "auto",
        height: "90%",
      }}>
        {children}
      </Card>
    </Container>
  );
};

export default ContainerCard;