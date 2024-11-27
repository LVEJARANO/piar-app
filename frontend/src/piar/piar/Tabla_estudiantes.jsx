import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";
import { Lista_Grados_estudiantes } from "../../services/service_piar";
import { toast } from "react-toastify";
import { Card, Col, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";

function Tabla_estudiantes({ formData, setFormData }) {
  const [estudianteslist, setestudiantes] = useState([]);

  const [lista, setlista] = useState([]);
  const navigate = useNavigate();
  const navigatenuevopiar = (id) => {
    navigate(`/dashboard/piar-form/${formData.sede}/${formData.anual}/${formData.grado}/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Lista_Grados_estudiantes(
          formData.anual,
          formData.sede,
          formData.grado
        );
        console.log("🚀 ~ fetchData ~ response grados hhhhhhhh :", response.data);
        setestudiantes(response.data.estudiantes);
        setlista(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, [formData.grado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="mt-4">
        <h5>Lista de Estudiantes</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Documento</th>
              <th>Primer Nombre</th>
              <th>Segundo Nombre</th>
              <th>Primer Apellido</th>
              <th>Segundo Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudianteslist.map((option, index) => (
              <tr key={option.id}>
                <td>{index + 1}</td>
                <td>{option.documento}</td>
                <td>{option.primer_nombre}</td>
                <td>{option.segundo_nombre || "-"}</td>
                <td>{option.primer_apellido}</td>
                <td>{option.segundo_apellido || "-"}</td>
                <td>
                    <button className="btn btn-success"  onClick={() => navigatenuevopiar(option.id)} > piar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Tabla_estudiantes;
