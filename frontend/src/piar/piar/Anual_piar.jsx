import React, { useEffect, useState } from "react";
import { Anuales } from "../../services/service_piar";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grados_piar from "./Grados_piar";
import LIsta_Estudiantes from "./LIsta_Estudiantes";
import Tabla_estudiantes from "./Tabla_estudiantes";

function Anual_piar() {
  const navigate = useNavigate();
  const [anios, setanio] = useState([]);
  const { idsede } = useParams();

  const [formData, setFormData] = useState({
    anual: "",
    sede: idsede,
    grado: "",
    idpersona: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Anuales();
        console.log("🚀 ~ fetchData ~ response:", response);
        setanio(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigatenuevopiar = (id) => {
    navigate(`/dashboard/piar-form/${idsede}`);
  };

  return (
    <div>
      <div className="col-12 mt-3 mb-4">
        <h4 className="text-center"> Lista Piar </h4>
  
      </div>

      <div className="col-12">
        <div className="row"> 
        <div className="col-sm-12 col-md-6 col-lg-3 my-2">
          <label>Seleccionar Año :</label>
          <select
            id="anual"
            name="anual"
            className="form-select"
            aria-label="Default select example"
            value={formData.anual}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {anios.map((option, index) => (
              <option key={index} value={option.id}>
                {option.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-3 my-2">
          <Grados_piar formData={formData} setFormData={setFormData} />
        </div>
        </div>
      

        <div className="col-sm-12 col-md-6 col-lg-12 my-2">
          <Tabla_estudiantes formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default Anual_piar;
