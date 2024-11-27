import React, { useEffect, useState } from "react";
import {
  Lista_diagnostico_persona,
  Persona_id,
} from "../../services/service_piar";
import Modal_diagnostico from "./Modal_diagnostico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const storedUser = JSON.parse(localStorage.getItem("data"));
const isDocenteApoyoPresent =
  storedUser &&
  storedUser.modulo_gpo_permiso &&
  Array.isArray(storedUser.modulo_gpo_permiso.submodulo) &&
  storedUser.modulo_gpo_permiso.submodulo.some(
    (sub) => sub.nombre === "DOCENTE_APOYO"
  );

function Diagnostico({ formData, setFormData }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [diagnostico, setdiagnostico] = useState([]);

  const [persona, setpersona] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Persona_id(formData.idpersona);

        console.log("🚀 ~ fetchData ~ response grados :", response);
        setpersona(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, [mostrarModal, formData.idpersona]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsedi = await Lista_diagnostico_persona(formData.idpersona);
        console.log("🚀 ~ fetchData ~ responsedijjjjj:", responsedi);
        setdiagnostico(responsedi.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
        setdiagnostico([]);
      }
    };
    fetchData();
  }, [mostrarModal, formData.idpersona]);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const abrirModaleditar = () => {
    setMostrarModal(true);
  };
  return (
    <>
      {Array.isArray(diagnostico) && diagnostico.length === 0 ? (
        isDocenteApoyoPresent ? (
          <>
            {" "}
            <a
              className="btn p-0  ms-1 text-success "
              onClick={() => abrirModal()}
            >
              {" "}
              Agregar Diagnostico{" "}
              <FontAwesomeIcon icon="fa-solid fa-file-circle-check" />
            </a>
          </>
        ) : null
      ) : (
        <>
          <h4 className="text-center my-4"> Estudiante - PIAR</h4>
          <h5 className="text-center text-danger mb-3">
            {" "}
            {persona?.primer_nombre} {persona?.segundo_nombre}{" "}
            {persona?.primer_apellido} {persona?.segundo_apellido}
          </h5>

          <div className="card mx-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Diagnóstico del Estudiante :</h5>
              <p className="card-text">{diagnostico.descripcion}</p>
              {isDocenteApoyoPresent ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => abrirModaleditar(diagnostico.id)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Editar
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </>
      )}

      {mostrarModal && (
        <Modal_diagnostico
          onClose={() => setMostrarModal(false)}
          setMostrarModal={setMostrarModal}
          id={formData.idpersona}
          idd={diagnostico.id}
        />
      )}
    </>
  );
}

export default Diagnostico;
