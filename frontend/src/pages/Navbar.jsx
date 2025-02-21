import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import "../styles/NavbarStyle.css"
import { NavDropdown } from 'react-bootstrap';
import { ACCESS_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode';
import CookieConsent from 'react-cookie-consent';

function logout(){
  localStorage.clear(ACCESS_TOKEN)
  window.location.reload()
}

function isLogged(){
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  
  if(!accessToken) return false

  const decoded = jwtDecode(accessToken)
  const tokenExp = decoded.tokenExp
  const now = Date.now() / 1000

  if(tokenExp < now) return false
  return true
}



function NavbarComponent(){
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(localStorage.getItem('CookieConsent') === 'true');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const services = [
    {key: 1, title: "Výstavba", image: "/services/vystavba.png", routeName : "/vystavba"},
    {key: 2, title: "Rekonstrukce", image: "/services/rekonstrukce.png", routeName : "/rekonstrukce"},
    {key: 3, title: "Mechanizace", image: "/services/mechanizace.png", routeName : "/mechanizace"},
    {key: 4, title: "Lešení", image: "/images/services/leseni.png", routeName : "/leseni"},
  ]



  return (
    <>
      <Navbar expand="lg" sticky='top' data-bs-theme="dark" bg="white">
      <div className="navbar-info">
        <span>Jsme tu pro Vás: 6:00 - 15:00 | </span>
        <span >Telefon: <a href="tel:+420 603 859 971" style={{color: "#333"}}>+420 603 859 971</a> | </span>
        <span style={{marginRight: "100px"}} >Email: <a href="mailto:kancelar@mont-stav.cz" style={{color: "#333"}}>kancelar@mont-stav.cz</a></span>
      </div>
        <Navbar.Brand className='imgLogo'>
          <img src="/logo/logo.png" alt="Logo" style={{height: "auto", width: "100%"}} className={scrolled ? 'scrolled-logo' : ''}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-toggler'/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav variant='tabs' className={`navItems ${scrolled ? 'scrolled' : ''}`}>
            <Nav.Item >
              <Nav.Link as={Link} to="/" active={location.pathname === '/'}>O společnosti</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/realisations/list" active={location.pathname === '/realisations/list'}>Realizované zakázky</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <NavDropdown align={'end'} title="Služby" id="basic-nav-dropdown" >
              {services.map((service, index) => (
                <NavDropdown.Item key={service.key} as={Link} to={`/services${service.routeName}`}>
                  {service.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/contacts" active={location.pathname === '/contacts'}>Kontakty</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/prices" active={location.pathname === '/prices'}>Ceník</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        {
           isLogged() && (
            <Nav.Link onClick={logout} className="logout-link">Odhlásit se</Nav.Link>
          )
        }
      </Navbar>
      {!cookieAccepted && (
        <CookieConsent
          enableDeclineButton
          buttonText="Přijmout"
          declineButtonText="Odmítnout"
          style={{ background: "#333", color: "#fff" }}
          buttonStyle={{ background: "#007bff", color: "#fff", fontSize: "13px" }}
          declineButtonStyle={{ background: "#ff4d4d", color: "#fff", fontSize: "13px" }}
          expires={1}
        >
          Tato stránka používá cookies, aby vám poskytla co nejlepší zážitek. Kliknutím na "Přijmout" souhlasíte s jejich použitím.
        </CookieConsent>
      )}
    </>
  );
}

export default NavbarComponent;