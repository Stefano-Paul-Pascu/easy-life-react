import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import MyNavbar from "./Navbar";
import Dropdown from "react-bootstrap/Dropdown";

export default function Profile() {
  // Stato delle informazioni dell'utente
  const [userInfo, setUserInfo] = useState({
    nome: "",
    cognome: "",
    nomeUtente: "",
    email: "",
  });

  useEffect(() => {
    fetchUserInfo(); // Chiamata alla funzione fetchUserInfo al caricamento del componente
  }, []);

  // Funzione per ottenere le informazioni dell'utente dal server
  const fetchUserInfo = async (id) => {
    try {
    
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://localhost:3001/utenti/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }); 
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Funzione per gestire la modifica della password
const handlePasswordChange = async (e, id) => {
    e.preventDefault();
  
    const currentPassword = e.target.elements.currentPassword.value;
    const newPassword = e.target.elements.newPassword.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
  
    // Esegui la validazione dei campi password qui secondo le tue regole di business
  
    if (newPassword !== confirmPassword) {
      // La nuova password e la conferma password non corrispondono
      console.log("Le password non corrispondono");
      return;
    }
  
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(`http://localhost:3001/utenti/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
  
      if (response.ok) {
        // La modifica della password è avvenuta con successo
        console.log("Password modificata con successo");
      } else {
        // Gestisci l'errore della modifica della password
        console.log("Errore nella modifica della password");
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
            <div className="bg-white mt-5 p-3 border rounded opa">
              <h1>Modifica Profilo</h1>
              <hr className="border-3" />
              <Row>
                <Col>
                  <p>Nome</p>
                  <p>Cognome</p>
                  <p>Nome utente</p>
                  <p>Indirizzo e-mail</p>
                  <p>Password</p>
                </Col>

                <Col>
                  <p>{userInfo.nome}</p>
                  <p>{userInfo.cognome}</p>
                  <p>{userInfo.nomeUtente}</p>
                  <p>{userInfo.email}</p>

                  {["end"].map((end) => (
                    <Dropdown
                      as={end}
                      key={end}
                      id={`dropdown-button-drop-${end}`}
                      drop={end}
                      variant="secondary"
                      title={` Modifica password `}
                    >
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Modifica password
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <div className="p-3">
                          <Form onSubmit={handlePasswordChange}>
                            <Form.Group className="mb-3" controlId="">
                              <Form.Label>Password corrente</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Password corrente"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                              <Form.Label>Nuova password</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Nuova password"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="">
                              <Form.Label>Conferma password</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Conferma password"
                              />
                            </Form.Group>

                            <Button variant="success" type="submit">
                              Modifica
                            </Button>
                          </Form>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  ))}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
