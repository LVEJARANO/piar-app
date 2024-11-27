import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Post_razonables,
  Getrazonables,
  Put_razonables,
} from "../../services/service_piar";

function Modal_razonables({ onClose, setMostrarModal, data, materia, id }) {
  const piar_id = parseInt(data.id, 10);
  const idmateria = parseInt(materia, 10);

  const [formDataa, setFormDataa] = useState({
    ajustes: "",
    didacticos: "",
    evaluacion: "",
    adicionales: "",
    casa: "",
    materia: idmateria,
    piar: piar_id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDataa);
    try {
      const response = id
        ? await Put_razonables(id, formDataa)
        : await Post_razonables(formDataa);

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
          const response = await Getrazonables(id);

          const {
            ajustes,
            didacticos,
            evaluacion,
            adicionales,
            casa,
            materia,
            piar,
          } = response.data;
          setFormDataa({
            ajustes,
            didacticos,
            evaluacion,
            adicionales,
            casa,
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
      <Modal show={true} onHide={onClose} centered backdrop="static"size="lg"  style={{ zIndex: 1500 }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="ajustes" className="text-muted fw-bold">
                Ajustes curriculares :
              </label>
              <textarea
                type="text"
                name="ajustes"
                className="form-control"
                value={formDataa.ajustes}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="didacticos" className="text-muted fw-bold">
                Ajustes didacticos y metodologicos :
              </label>
              <textarea
                type="text"
                name="didacticos"
                className="form-control"
                value={formDataa.didacticos}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="evaluacion" className="text-muted fw-bold">
                Ajustes en la evaluacion :
              </label>
              <textarea
                type="text"
                name="evaluacion"
                className="form-control"
                value={formDataa.evaluacion}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="adicionales" className="text-muted fw-bold">
                Actividades Adicionales :
              </label>
              <textarea
                type="text"
                name="adicionales"
                className="form-control"
                value={formDataa.adicionales}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="casa" className="text-muted fw-bold">
                Actividades en casa :
              </label>
              <textarea
                type="text"
                name="casa"
                className="form-control"
                value={formDataa.casa}
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

export default Modal_razonables;
