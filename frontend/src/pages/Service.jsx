import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate} from "react-router-dom";
import NavbarComponent from "./Navbar";
import Vystavba from "../components/Vystavba";
import Leseni from "../components/Leseni";
import Mechanizace from "../components/Mechanizace";
import Rekonstrukce from "../components/Rekonstrukce";
import Dokumentace from "../components/Dokumentace";

function Service() {

    const params = useParams();
    const service = params.service;
    const allowedServices = ["vystavba", "leseni", "mechanizace", "rekonstrukce", "dokumentace"]; // Add your allowed services here
    const navigate = useNavigate();


    

    switch (service) {
        case "vystavba":
            return <Vystavba/>;
        case "leseni":
            return <Leseni/>;
        case "mechanizace":
            return <Mechanizace/>;
        case "rekonstrukce":
            return <Rekonstrukce/>;
        case "dokumentace":
            return <Dokumentace/>;
        default:
            return <Navigate to="/404"/>;
    }
}

export default Service