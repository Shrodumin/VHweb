import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";
import api from "../api";
import React from "react";

function RealisationsListComponent() {
  const [realisations, setRealisations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRealisations();
  }, []);

  const getRealisations = async () => {
    try {
      const res = await api.get("/api/realisations/");
      const data = res.data;
      setRealisations(data);

      // Čekáme na načtení všech obrázků
      const imagePromises = data.map((realisation) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = `https://res.cloudinary.com/dotqkdyma/${realisation.image}`;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div
          className="loading-container d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status" style={{ width: "5rem", height: "5rem" }} />
        </div>
      ) : (
        <Container style={{minHeight: "75vh"}}>
          <Row className="justify-content-center">
            {realisations.map((realisation) => (
              <Col key={realisation.id} xs={12} sm={10} md={6} lg={4} className="d-flex justify-content-center">
                <Card
                  style={{
                    width: "100%",
                    maxWidth: "350px", // Oprava přesahování
                    margin: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease-in-out",
                  }}
                  className="hover-card"
                >
                  <Link
                    to={`/realisations/${realisation.id}/posts`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Card.Header
                      style={{
                        backgroundColor: "#f7f7f7",
                        padding: "10px",
                        borderRadius: "10px 10px 0 0",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {realisation.title}
                    </Card.Header>
                    <Card.Body
                      style={{
                        padding: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={`https://res.cloudinary.com/dotqkdyma/${realisation.image}`}
                        alt={realisation.title}
                        className="realisation-image"
                        fluid
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default RealisationsListComponent;
