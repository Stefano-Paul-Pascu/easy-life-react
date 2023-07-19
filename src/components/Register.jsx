import {Alert, Spinner, Col, Button, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {

  const navigator = useNavigate();

  const [utente, setUtente] = useState({
      username: "",
      nome: "",
      cognome: "",
      email: "",
      password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOk, setIsOk] = useState(false);

  const handleClick = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
      try {
          const response = await fetch(`http://localhost:3001/auth/register`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(utente),
          });
          if (response.ok) {
              const userData = await response.json();
              console.log(userData);
              setIsOk(true);
              setTimeout(() => {
                  navigator("/");
              }, 1500);
          } else {
              const errorData = await response.json();
              console.log(errorData);
              setError("Ci sono stati errori in fase di registrazione");
              setTimeout(() => {
                  setIsLoading(false);
              }, 500);
          }
      } catch (error) {
          console.log(error);
          setError("Si è verificato un errore. Riprova più tardi.");
      }
  };
  return (
    <div className="wallpaper2">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>            
                <div className="mb-3 mt-md-4 d-flex flex-column">
                  <h1 className="fw-light mb-5 text-center easy-life-h1">EASY LIFE</h1>
                  <div className="mb-3 formdiv">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-center">
                                 Nome
                            </Form.Label>
                            <Form.Control
                            type="text" 
                            placeholder="Inserisci il tuo nome" 
                            value={utente.nome}
                            onChange={(e) => setUtente({ ...utente, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-center">
                                 Cognome
                            </Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il tuo cognome" 
                            value={utente.cognome}
                            onChange={(e) => setUtente({ ...utente, cognome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-center">
                                 Nome utente
                            </Form.Label>
                            <Form.Control type="text" placeholder="Inserisci un nome utente"
                            value={utente.username}
                            onChange={(e) => setUtente({ ...utente, username: e.target.value })}
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                                Indirizzo email
                            </Form.Label>
                            <Form.Control 
                            type="email" placeholder="Enter email"
                            value={utente.email}
                            onChange={(e) => setUtente({ ...utente, email: e.target.value })}
                             />
                        </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" placeholder="Password"
                        value={utente.password}
                        onChange={(e) => setUtente({ ...utente, password: e.target.value })}
                         />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="button"
                         onClick={handleClick}
                         disabled={isLoading}
                     >
                         {isLoading ? (
                             <>
                                 <Spinner animation="grow" size="sm" className="me-2" />
                             </>
                         ) : (
                             ""
                         )}
                        <a href="./success" className="text-white text-decoration-none">
                          Registrati
                          </a>
                        </Button>
                      </div>
                    </Form>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Sei già registrato?{" "}
                        <a href="./" className="text-primary fw-bold">
                          Entra!
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;