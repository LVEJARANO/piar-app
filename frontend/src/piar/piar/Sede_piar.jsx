import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sede_piar() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("data"));
  console.log("🚀 ~ Matricula ~ storedUser:", storedUser);

  const navigatenuevavivienda = (id) => {
    navigate(`/dashboard/anual-piar/${id}`);
  };

  const [sedes, setsedes] = useState(storedUser.modulo_gpo_permiso.sedegp);

  return (
    <>
      <div className="row">
        <h4 className="text-center my-4"> Sedes </h4>
        <Row xs={1} md={2} lg={3} className="g-4">
          {sedes.map((item, index) => (
            <Col key={index}>
              <Card
                onClick={() => navigatenuevavivienda(item.id)}
                style={{
                  border: "1px solid #198754", // Cambia el color y grosor del borde según desees
                  borderRadius: "8px", // Opcional: Esquinas redondeadas
                  background: "#f8f9fa",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-center">
                    {item.descripcion}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Sede_piar;
