import {Navigate} from 'react-router-dom'
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, NavDropdown, Card} from 'react-bootstrap';
import NavbarComponent from '../pages/Navbar';
import RealisationsListComponent from './RealisationsListComponent';


function Realisations() {
    
    return (
        <>
        <NavbarComponent/>
        <RealisationsListComponent/>
        </>
    )
}

export default Realisations