import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";
import { Lista_Grados } from "../../services/service_piar";
import { toast } from "react-toastify";
import { Card, Col, Row } from "react-bootstrap";
function Grados() {
  const navigate = useNavigate();
  const { idsede } = useParams();
  const { idanual } = useParams();
  const [gradoslist, setgradoslist] = useState([]);
  const nuevogrado = () => {
    navigate(`/dashboard/matricula-grado-form/${idsede}/${idanual}`);
  };

  const editargrado = (id) => {
    navigate(`/dashboard/matricula-grado-form-editar/${idsede}/${idanual}/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Lista_Grados(idanual, idsede);
        console.log("🚀 ~ fetchData ~ response grados :", response);
        setgradoslist(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="col-12 mt-3">
        <h4 className="text-center"> Lista de Grados </h4>
        <div className="col-12 d-flex justify-content-between">
          <button className="btn btn-success" onClick={nuevogrado}>
            <FontAwesomeIcon icon="fa-solid fa-plus" /> Nuevo
          </button>
        </div>
      </div>

      <div className="row">
  <Row xs={1} md={2} lg={3} className="g-4">
    {gradoslist.map((item, index) => (
      <Col key={index}>
        <Card
          style={{
            border: "1px solid #198754", // Color y grosor del borde
            borderRadius: "8px", // Esquinas redondeadas
            background: "#f8f9fa", // Fondo suave
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave para profundidad
            transition: "transform 0.3s ease-in-out", // Efecto de transición
          }}
          className="hover-shadow"
        >
          <button
            className="btn btn-outline-primary rounded-circle"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "5px 10px",
              zIndex: 10,
            }}
            onClick={() => editargrado(item.id)}
          >
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
          </button>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title className="text-center text-uppercase" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              {item.nombre_grado}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</div>
    </div>
  );
}

export default Grados;
