import { Col, Button, Row, Container, Form } from "react-bootstrap";


export default function Success() {
  return (
    <div className="wallpaper">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>            
              
                <div className="mb-3 mt-md-4 d-flex flex-column">
                  <h1 className="fw-light mb-5 text-center easy-life-h1">EASY LIFE</h1>
                  <div className="mb-3 formdiv">
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Registrazione effettuata con successo!
                        <a href="./" className="text-primary fw-bold">
                          Entra ora!
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