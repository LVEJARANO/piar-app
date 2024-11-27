import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal_contexto from "./Modal_contexto";
import { Lista_contexto } from "../../services/service_piar";
import { Card } from "react-bootstrap";

function Contexto_general({ data }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModaleditar, setMostrarModaleditar] = useState(false);
  const [contexto, setcontexto] = useState([]);
  const [idcontexto, setidcontexto] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("data"));
  const isDocenteApoyoPresent =
    storedUser &&
    storedUser.modulo_gpo_permiso &&
    Array.isArray(storedUser.modulo_gpo_permiso.submodulo) &&
    storedUser.modulo_gpo_permiso.submodulo.some(
      (sub) => sub.nombre === "DOCENTE_APOYO"
    );

  const abrirModal = () => {
    setMostrarModal(true);
    setidcontexto("");
  };

  const abrirModaleditar = (id) => {
    setMostrarModaleditar(true);
    setidcontexto(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Lista_contexto(data.id);
        console.log("🚀 ~ fetchData ~ response contexto:", response.data);
        setcontexto(response.data);
      } catch (error) {
        setcontexto([]);
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, [data.id, mostrarModal, mostrarModaleditar]);
  return (
    <>
      <div className=" mt-4">
        <div className="row">
          <div className="col-12">
            {contexto?.length === 0 && (
              <div className="d-flex justify-content-between mb-4">
                {isDocenteApoyoPresent ? (
                  <>
                    {" "}
                    <button className="btn btn-success" onClick={abrirModal}>
                      <FontAwesomeIcon icon="fa-solid fa-plus" /> Nuevo
                    </button>
                  </>
                ) : null}

                {mostrarModal && (
                  <Modal_contexto
                    onClose={() => setMostrarModal(false)}
                    setMostrarModal={setMostrarModal}
                    data={data}
                    id={idcontexto}
                  />
                )}
              </div>
            )}

            {contexto?.length !== 0 && (
              <>
                {" "}
                <Card className="shadow-sm border">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="text-primary mb-0"></h5>

                      {isDocenteApoyoPresent ? (
                        <>
                          {" "}
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => abrirModaleditar(contexto?.id)}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />{" "}
                            Editar
                          </button>{" "}
                        </>
                      ) : null}
                    </div>

                    {mostrarModaleditar && (
                      <Modal_contexto
                        onClose={() => setMostrarModaleditar(false)}
                        setMostrarModal={setMostrarModaleditar}
                        data={data}
                        id={idcontexto}
                      />
                    )}

                    <h6 className="my-3">
                      <strong>Descripción General del Estudiante:</strong>{" "}
                      {contexto?.descripacion || "No disponible"}
                    </h6>
                    <h6 className="my-3">
                      <strong>Contexto Familiar:</strong>{" "}
                      {contexto?.familiar || "No disponible"}
                    </h6>
                    <h6 className="my-3">
                      <strong>Otros Contextos:</strong>{" "}
                      {contexto?.otros || "No disponible"}
                    </h6>
                  </Card.Body>
                </Card>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contexto_general;
