import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";
import { Lista_Grados } from "../../services/service_piar";
import { toast } from "react-toastify";
import { Card, Col, Row } from "react-bootstrap";


function Grados_piar({formData,setFormData}) {
  const navigate = useNavigate();

  const [gradoslist, setgradoslist] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Lista_Grados(formData.anual,formData.sede);
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
  }, [formData.anual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <label>Seleccionar Grado :</label>
      <select
        id="grado"
        name="grado"
        className="form-select"
        aria-label="Default select example"
        value={formData.grado}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Seleccionar
        </option>
        {gradoslist.map((option, index) => (
          <option key={index} value={option.id}>
            {option.nombre_grado}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Grados_piar;
