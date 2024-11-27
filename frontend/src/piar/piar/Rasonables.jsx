import React, { useEffect, useState } from "react";
import {
  Materias_por_estudiante,
  Get_por_piar_desde_rasonables,
} from "../../services/service_piar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal_razonables from "./Modal_razonables";
import { Card, Button } from "react-bootstrap";

function Rasonables({ data, formData }) {
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
        const responsedi = await Get_por_piar_desde_rasonables(data.id);
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
                {item.descripcion}{" "}
              </button>
            ))}
        </div>

        {/* Listado de materias ya seleccionadas */}
        <div className="row">
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
                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />{" "}
                      Editar
                    </Button>
                  </div>
                  <p>
                    <strong>Ajustes curriculares:</strong> {item.ajustes}
                  </p>
                  <p>
                    <strong>Ajustes didácticos y metodológicos:</strong>{" "}
                    {item.didacticos}
                  </p>
                  <p>
                    <strong>Ajustes en la evaluación:</strong> {item.evaluacion}
                  </p>
                  <p>
                    <strong>Actividades Adicionales:</strong> {item.adicionales}
                  </p>
                  <p>
                    <strong>Actividades en casa:</strong> {item.casa}
                  </p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* Modal para la razón de los ajustes */}
        {mostrarModal && (
          <Modal_razonables
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

export default Rasonables;
