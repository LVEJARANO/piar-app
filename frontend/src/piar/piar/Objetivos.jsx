import React, { useEffect, useState } from "react";
import {
  Materias_por_estudiante,
  Get_por_piar_desde_objetivos,
} from "../../services/service_piar";
import Modal_objetivos from "./Modal_objetivos";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Objetivos({ data, formData }) {
  const [materias, setmaterias] = useState([]);
  const [listamaterias, setlistamaterias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idmateria, setidmateria] = useState("");
  const [idobjetivo, setidobjetivo] = useState("");
  const [materiaIds, setMateriaIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsedi = await Materias_por_estudiante(
          formData.idpersona,
          formData.anual,
          formData.grado,
          formData.sede
        );
        console.log("🚀 ~ fetchData ~ responsedi:", responsedi);

        setmaterias(responsedi.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [mostrarModal, formData.grado, formData.idpersona, data.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsedi = await Get_por_piar_desde_objetivos(data.id);
        const ids = responsedi.data.data.map((item) => item.materia.id);
        setMateriaIds(ids);
        setlistamaterias(responsedi.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [mostrarModal, data.id]);

  const abrirModal = (id) => {
    setMostrarModal(true);
    setidmateria(id);
    setidobjetivo("");
  };

  const abrirModaleditar = (idmmat, id) => {
    setMostrarModal(true);
    setidmateria(idmmat);
    setidobjetivo(id);
  };

  return (
    <>
      <div className=" mt-4">
        {/* Botones para las materias disponibles */}
        <div>
          {materias
            .filter((item) => !materiaIds.includes(item.id)) // Filtra los IDs no presentes en materiaIds
            .map((item) => (
              <button
                className="btn btn-success m-1"
                onClick={() => abrirModal(item?.id)}
              >
                 <FontAwesomeIcon icon="fa-solid fa-plus" /> {item.descripcion}{" "}
              </button>
            ))}
        </div>

        {/* Listado de materias ya seleccionadas */}
        <div className="row mt-4">
          {listamaterias.map((item, index) => (
            <div className="col-sm-12 col-md-12 col-lg-12" key={index}>
              <Card className="shadow-sm border mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-primary">{item.materia.descripcion}</h5>
                    <Button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        abrirModaleditar(item.materia.id, item?.id)
                      }
                    >
                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                      Editar
                    </Button>
                  </div>
                  <p>
                    <strong>Objetivos y metas para el año escolar:</strong>{" "}
                    {item.evaluacion}
                  </p>
                  <p>
                    <strong>Retroalimentación y evaluación del proceso:</strong>{" "}
                    {item.metas}
                  </p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* Modal para objetivos */}
        {mostrarModal && (
          <Modal_objetivos
            onClose={() => setMostrarModal(false)}
            setMostrarModal={setMostrarModal}
            materia={idmateria}
            data={data}
            id={idobjetivo}
          />
        )}
      </div>
    </>
  );
}

export default Objetivos;
