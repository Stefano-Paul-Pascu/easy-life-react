import { Container, Row, Col, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./Navbar";

const EditImpegno = (props) =>{
    const [impegno, setImpegno] = useState({
        data: "",
        ora: "",
        impegno: "",
        idUtente: "",
        statoImpegno: "",
      });
    
      useEffect(() => {
        setImpegno({
          data: props.impegno.data,
          ora: props.impegno.ora,
          impegno: props.impegno.impegno,
          idUtente: props.impegno.utente.id,
          statoImpegno: props.impegno.statoImpegno,
        });
        console.log(props.impegno);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props]);
    
      const modImpegno = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(
            `http://localhost:3001/impegni/${props.impegno.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token,
              },
              body: JSON.stringify(impegno),
            }
          );
          if (response.ok) {
            const risposta = await response.json();
            console.log(risposta);
            props.onHide();
            props.reset();
          } else {
            const errorData = await response.json();
            console.log(errorData);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    return(
        <div className="homebg">
        <MyNavbar />
        <Container className="mt-4">
            <Row className="vh-100">
            <Col md={8} lg={8} xs={12}>
            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Data</Form.Label>
                    <Form.Control type="Date" placeholder="Inserisci una data"
                    value={impegno.data}
                    onChange={(e) => setImpegno({ ...impegno, data: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Ora</Form.Label>
                    <Form.Control type="time" placeholder="Inserisci un orario"
                    value={impegno.ora}
                    onChange={(e) => setImpegno({ ...impegno, ora: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Impegno</Form.Label>
                    <Form.Control type="" placeholder="Inserisci un impegno" 
                    value={impegno.impegno}
                    onChange={(e) => setImpegno({ ...impegno, impegno: e.target.value })} />
                </Form.Group>

                <Button variant="success" type="submit"
                onClick={() =>
                    modImpegno(impegno)
                  }>
                    Modifica
                </Button>
            </Form>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default EditImpegno;


/*
onClick={() =>
                        modificaImpegno(impegno)
                      }
*/