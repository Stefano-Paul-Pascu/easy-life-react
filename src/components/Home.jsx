import { Container, Row, Col, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./Navbar";


const Home = () => {
  const [impegni, setImpegni] = useState([]);
  const [nuovoImpegno, setNuovoImpegno] = useState({
    data: "",
    ora: "",
    impegno: "",
    stato: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Esegui il fetch degli impegni all'avvio della pagina
    fetchImpegni();
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
        setImpegni(data);
      } else {
        setError("Errore durante il recupero degli impegni.");
      }
    } catch (error) {
      console.log(error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const aggiungiImpegno = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
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
        setImpegni((prevImpegni) => [...prevImpegni, data]);

        setNuovoImpegno({
          data: "",
          ora: "",
          impegno: "",
          stato: false,
        });
      } else {
        setError("Errore durante l'aggiunta dell'impegno.");
      }
    } catch (error) {
      console.log(error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
    setIsLoading(false);
  };

  const modificaImpegno = async (id, nuovoStato) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://localhost:3001/impegni/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuovoStato),
      });
      if (response.ok) {
        // Aggiorna la lista degli impegni dopo la modifica
        fetchImpegni();
      } else {
        setError("Errore durante la modifica dell'impegno.");
      }
    } catch (error) {
      console.log(error);
      setError("Si è verificato un errore. Riprova più tardi.");
    }
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
          <Col md={2} lg={2} xs={4} className="border-end">
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
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Data"
                  className=""
                >
                  <Dropdown href="#/action-1">
                    <div className="px-3 py-0">
                    <Form.Group className="" controlId="">
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
                    </div>
                  </Dropdown>
                </DropdownButton>
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

            {impegni.map((impegno) => (
              <Row key={impegno.id}>
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
                  <div className="form-check ps-0">
                    <input
                      id={`checkbox-${impegno.id}`}
                      type="checkbox"
                      className="me-1"
                      checked={impegno.stato}
                      onChange={() =>
                        modificaImpegno(impegno.id, {
                          stato: !impegno.stato,
                        })
                      }
                    />
                    <label htmlFor={`checkbox-${impegno.id}`}>
                      {impegno.stato ? "Fatto" : "Da fare"}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-warning me-2"
                      onClick={() =>
                        modificaImpegno(impegno.id, {
                          stato: !impegno.stato,
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
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
