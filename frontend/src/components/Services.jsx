import { Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "../pages/Navbar";

function Services({title, image}){
    const services = [
        {key: 1, title: "Výstavba", image: "/services/vystavba.png", routeName : "/vystavba"},
        {key: 2, title: "Lešení", image: "/services/leseni.png", routeName : "/leseni"},
        {key: 3, title: "Mechanizace", image: "/services/mechanizace.png", routeName : "/mechanizace"},
        {key: 4, title: "Rekonstrukce rodinných domů", image: "/services/rekonstrukce.png", routeName : "/rekonstrukce"},
        {key: 5, title: "Dokumentace", image: "/services/vystavba.png", routeName : "/dokumentace"},
    ]

    return (
        <>
            <h1 className="text-center" style={{marginTop: "50px", marginBottom: "50px"}}>SLUŽBY</h1>
            <Container fluid>
                <Row className="justify-content-center">
                {services.map((service, index) => (
                    <Col key={service.key} md={2}>
                        <Link
                        to={`/services${service.routeName}`}
                        style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        }}
                        >
                        <Card 
                            key={index} 
                            className="hover-card"
                            style={{
                                marginBottom : "20px",
                                width: "100%",
                                height: "100%" }}>
                            <Card.Body>
                                <Card.Title style={{textAlign: "center"}}>{service.title}</Card.Title>
                            </Card.Body>
                            <Card.Img variant="bottom" style={{objectFit: "fill", padding: "1%"}} src={service.image} />
                        </Card>
                        </Link>
                    </Col>
                    
                ))}
                </Row>
            </Container>
        </>
    )
}

export default Services;