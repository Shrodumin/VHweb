import {Navigate} from 'react-router-dom'
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, NavDropdown, Card, Image} from 'react-bootstrap';
import React from 'react';

function RealisationsListComponent() {

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
        <Container>
            <Row className='justify-content-center'>
                {realisations.map((realisation) => (
                <Col key={realisation.id} xs={12} md={6} lg={4}>
                    <Card
                    style={{
                        width: '100%',
                        margin: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                    }}
                    className="hover-card"
                    >
                    <Link
                        to={`/realisations/${realisation.id}/posts`}
                        style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        }}
                    >
                        <Card.Header
                        style={{
                            backgroundColor: '#f7f7f7',
                            padding: '10px',
                            borderRadius: '10px 10px 0 0',
                            textAlign: 'center',
                            fontWeight: 'bold',

                        }}
                        >
                        {realisation.title}
                        </Card.Header>
                        <Card.Body
                        style={{
                            padding: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                        <Image
                            src={"https://res.cloudinary.com/dotqkdyma/"+realisation.image}
                            alt={realisation.title}
                            className="realisation-image"
                            fluid
                            style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'fill',
                            borderRadius: '10px',
                            }}
                        />
                        </Card.Body>
                    </Link>
                    </Card>
                </Col>
                ))}
            </Row>
            </Container>
        </>
    )
}

export default RealisationsListComponent