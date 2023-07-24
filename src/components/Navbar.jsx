import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const [userInfo, setUserInfo] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const id = getUserIdFromToken();
    fetchUserInfo(id);
  }, []);

  const getUserIdFromToken = () => {
    const userId = JSON.parse(localStorage.getItem('utenteLoggato'));
    return userId;
  };

  const fetchUserInfo = async (id) => {
    try {
      console.log('id', id)
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://localhost:3001/utenti/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.log("Errore nella richiesta dei dati dell'utente");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-white navbg">
      <Container>
        <Navbar.Brand href="./home">Easy Life</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="./home">Home</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={`Benvenuto, ${userInfo.nome}`} id="collasible-nav-dropdown" className="me-5">
              <NavDropdown.Item href="./profile">Il tuo profilo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Esci</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
