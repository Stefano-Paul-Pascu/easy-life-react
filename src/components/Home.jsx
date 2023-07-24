import { Container, Row, Col, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MyNavbar from "./Navbar";


const Home = () => {
  const [impegni, setImpegni] = useState([]);
  const [nuovoImpegno, setNuovoImpegno] = useState({
    idUtente: "",
    data: "",
    ora: "",
    impegno: "",
    statoImpegno: 'DA_FARE',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Esegui il fetch degli impegni all'avvio della pagina
    fetchImpegni();
  }, []);

  useEffect(() => {
    // Esegui il fetch degli impegni all'avvio della pagina
    getUserId();
  }, []);

  const fetchImpegni = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://localhost:3001/impegni`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('data fetchImpegno', data);

        setImpegni(data);
      } else {
        setError("Errore durante il recupero degli impegni.");
      }
    } catch (error) {
      console.log(error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const getUserId = () => {
    const userId = JSON.parse(localStorage.getItem('utenteLoggato'));
    setNuovoImpegno({
      ...nuovoImpegno,
      idUtente: userId
    })
  };

  const aggiungiImpegno = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
   
    try {
      getUserId();
      console.log('nuovoImpegno', nuovoImpegno)
      console.log(JSON.stringify(nuovoImpegno))
      console.log('impegni', impegni)
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://localhost:3001/impegni`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuovoImpegno),
      });
      if (response.ok) {
        // Aggiornamento della lista degli impegni dopo l'aggiunta
        const data = await response.json();
        console.log('data aggiungiImpegno', data);
        setImpegni((prevImpegni) => [...prevImpegni, data]);
        // const userId = JSON.parse(localStorage.getItem('utenteLoggato'));
      } else {
        setError("Errore durante l'aggiunta dell'impegno.");
      }
    } catch (error) {
      console.log(error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
    setIsLoading(false);
  };

  

  const cancellaImpegno = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://localhost:3001/impegni/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Aggiorna la lista degli impegni dopo la cancellazione
        fetchImpegni();
      } else {
        setError("Errore durante la cancellazione dell'impegno.");
      }
    } catch (error) {
      console.log(error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
  };

  return (
    <div className="homebg">
      <MyNavbar />
      <Container className="mt-3">
        <Row className="vh-100">
          <Col md={2} lg={2} xs={12} className="mb-3 mb-md-0">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Add
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="p-3">
                  <Form onSubmit={aggiungiImpegno}>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label>Data</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Inserisci una data"
                        value={nuovoImpegno.data}
                        onChange={(e) =>
                          setNuovoImpegno({
                            ...nuovoImpegno,
                            data: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                      <Form.Label>Ora</Form.Label>
                      <Form.Control
                        type="time"
                        placeholder="Inserisci un orario"
                        value={nuovoImpegno.ora}
                        onChange={(e) =>
                          setNuovoImpegno({
                            ...nuovoImpegno,
                            ora: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                      <Form.Label>Impegno</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci un impegno"
                        value={nuovoImpegno.impegno}
                        onChange={(e) =>
                          setNuovoImpegno({
                            ...nuovoImpegno,
                            impegno: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Button variant="success" type="submit">
                      Aggiungi
                    </Button>
                  </Form>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col className="responsive">
            <Row>
              <Col>
                <div>Data</div>
              </Col>
              <Col>
                <div>Ora</div>
              </Col>
              <Col>
                <div>Impegno</div>
              </Col>
              <Col>
                <div>Stato</div>
              </Col>
              <Col>
                <div></div>
              </Col>
            </Row>
            <hr />
            {impegni
                .sort((a, b) => new Date(a.data) - new Date(b.data))
                .map((impegno) => (
        <Row key={impegno.id} className="mb-3">
                <Col>
                  <div>{impegno.data}</div>
                </Col>
                <Col>
                  <div>{impegno.ora}</div>
                </Col>
                <Col>
                  <div>{impegno.impegno}</div>
                </Col>
                <Col>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                </div>
                </Col>
                <Col>
                  <div>
                  
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => cancellaImpegno(impegno.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                        />
                      </svg>
                    </button>
                  </div>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;