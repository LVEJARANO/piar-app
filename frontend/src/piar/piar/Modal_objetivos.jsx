import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Post_objetivos,
  Getobjetivos,
  Put_objetivos,
} from "../../services/service_piar";

function Modal_objetivos({ onClose, setMostrarModal, data, materia, id }) {
  const piar_id = parseInt(data.id, 10);
  const idmateria = parseInt(materia, 10);

  const [formDataa, setFormDataa] = useState({
    metas: "",
    evaluacion: "",
    materia: idmateria,
    piar: piar_id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDataa);
    try {
      const response = id
        ? await Put_objetivos(id, formDataa)
        : await Post_objetivos(formDataa);

      toast.success("Guardado Exitoso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setMostrarModal(false);
    } catch (error) {
      toast.error("Error Guardar el Radicado", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (id) {
      const fetchTaskDetails = async () => {
        try {
          const response = await Getobjetivos(id);

          const { metas, evaluacion, materia, piar } = response.data;
          setFormDataa({
            metas,
            evaluacion,
            materia,
            piar,
          });
          // validarfechanacimiento();
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      };
      fetchTaskDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataa({
      ...formDataa,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal show={true} onHide={onClose} centered backdrop="static" style={{ zIndex: 1500 }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="metas" className="text-muted fw-bold">
                Objetivos y metas para el año escolar :
              </label>
              <textarea
                type="nombre"
                name="metas"
                className="form-control"
                value={formDataa.metas}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="evaluacion" className="text-muted fw-bold">
                Retroalimentacion y evaluacion del proceso:
              </label>
              <textarea
                type="text"
                name="evaluacion"
                className="form-control"
                value={formDataa.evaluacion}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Modal_objetivos;
