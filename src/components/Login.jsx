import { Col, Button, Row, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigator = useNavigate();

  const [utenteLogin, setUtenteLogin] = useState({
      email: "",
      password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [utenteLoggato, setUtenteLoggato] = useState(null);

  useEffect(() => {
      localStorage.setItem("utenteLoggato", JSON.stringify(utenteLoggato));
  }, [utenteLoggato])

  const handleClick = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
      try {
          const response = await fetch(`http://localhost:3001/auth/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(utenteLogin),
          });
          if (response.ok) {
              const userData = await response.json();
              localStorage.setItem("token", JSON.stringify(userData.jwtToken));
              setUtenteLoggato(userData.u);

              navigator("/home");
          } else {
              setError("Credenziali errate. Riprova.");
          }
      } catch (error) {
          console.log(error);
          setError("Si è verificato un errore. Riprova più tardi.");
      }
      setIsLoading(false);
  };

  return (
    <div className="wallpaper">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>            
              
                <div className="mb-3 mt-md-4 d-flex flex-column">
                  <h1 className="fw-light mb-5 text-center easy-life-h1">EASY LIFE</h1>
                  <div className="mb-3 formdiv">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Indirizzo email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                        value={utenteLogin.email}
                        onChange={(e) => setUtenteLogin({ ...utenteLogin, email: e.target.value })} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                        value={utenteLogin.password}
                        onChange={(e) => setUtenteLogin({ ...utenteLogin, password: e.target.value })} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Hai dimenticato la password?
                          </a>
                        </p>
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
                         )}<a href="./home" className="text-white text-decoration-none">
                          Entra
                          </a>
                        </Button>
                        
                      </div>
                    </Form>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Non sei ancora registrato?{" "}
                        <a href="./register" className="text-primary fw-bold">
                          Fallo ora!
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

export default Login;