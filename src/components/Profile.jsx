import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import MyNavbar from './Navbar';

export default function Profile() {
  // Stato delle informazioni dell'utente
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

  return (
    <div className="profilebg">
      <MyNavbar />
      <Container>
        <Row className="vh-100 d-flex justify-content-center">
          <Col md={8} lg={10} xs={12}>            
                
                <div className='bg-white mt-5 p-3 border rounded opa'>
                    <h1>Profilo Utente</h1>
                    <hr className='border-3' />
                    <Row>
                        <Col>
                            <p>Nome</p>
                            <p>Cognome</p>
                            <p>Nome utente</p>
                            <p>Indirizzo e-mail</p>
                        </Col>
                        <Col>
                            <p>{userInfo.nome}</p>
                            <p>{userInfo.cognome}</p>
                            <p>{userInfo.username}</p>
                            <p>{userInfo.email}</p>
                        </Col>
                    </Row>
                </div>

            </Col>
          </Row>
        </Container>
      </div>
    )
}
