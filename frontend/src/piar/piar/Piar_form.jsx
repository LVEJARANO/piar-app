import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Anuales } from "../../services/service_piar";
import Grados_piar from "./Grados_piar";
import LIsta_Estudiantes from "./LIsta_Estudiantes";
import Diagnostico from "./Diagnostico";
import Piar from "./Piar";

function Piar_form() {
  const [anios, setanio] = useState([]);
  const { idsede } = useParams();
  const { idanual } = useParams();
  const { idgrado } = useParams();
  const { idestu } = useParams();

  const [formData, setFormData] = useState({
    anual: idanual,
    sede: idsede,
    grado: idgrado,
    idpersona: idestu,
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

  return (
    <div className="row">
      {formData.sede !== "" &&
      formData.anual !== "" &&
      formData.idpersona !== "" ? (
        <>
          {" "}
          <div className="col-12 mt-4">
            <Diagnostico formData={formData} setFormData={setFormData} />
          </div>
          <div>
            <div
              className="card mx-4 shadow-sm mt-4"
              style={{
                border: "1px solid #198754", // Color azul
                borderRadius: "10px", // Bordes redondeados opcionales
              }}
            >
              <div className="card-body">
                <Piar formData={formData} setFormData={setFormData} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Piar_form;
