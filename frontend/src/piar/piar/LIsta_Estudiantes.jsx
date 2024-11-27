import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";
import { Lista_Grados_estudiantes } from "../../services/service_piar";
import { toast } from "react-toastify";
import { Card, Col, Row } from "react-bootstrap";

function LIsta_Estudiantes({ formData, setFormData }) {
  const [estudianteslist, setestudiantes] = useState([]);

  const [lista, setlista] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Lista_Grados_estudiantes(
          formData.anual,
          formData.sede,
          formData.grado
        );
        console.log("🚀 ~ fetchData ~ response grados :", response.data);
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
      <label>Seleccionar Estudiante :</label>
      <select
        id="idpersona"
        name="idpersona"
        className="form-select"
        aria-label="Default select example"
        value={formData.idpersona}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Seleccionar
        </option>
        {estudianteslist.map((option, index) => (
          <option key={index} value={option.id}>
           {option.documento} - {option?.primer_nombre} {option?.segundo_nombre}{" "}
            {option?.primer_apellido} {option?.segundo_apellido}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LIsta_Estudiantes;
