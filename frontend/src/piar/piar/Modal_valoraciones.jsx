import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Post_valoraciones,
  Getvaloraciones,
  Put_valoraciones,
} from "../../services/service_piar";

function Modal_valoraciones({ onClose, setMostrarModal, data, id }) {
  const piar_id = parseInt(data.id, 10);

  const [formDataa, setFormDataa] = useState({
    competencias: "",
    principales: "",
    estado: "",
    piar: piar_id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDataa);
    try {
      const response = id
        ? await Put_valoraciones(id, formDataa)
        : await Post_valoraciones(formDataa);

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
          const response = await Getvaloraciones(id);
          console.log("🚀 ~ fetchTaskDetails ~ response:", response);

          const { competencias, principales, estado, piar } = response.data;
          setFormDataa({
            competencias,
            principales,
            estado,
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
      <Modal show={true} onHide={onClose} centered backdrop="static"  style={{ zIndex: 1500 }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="competencias" className="text-muted fw-bold">
                Competencias y habilidades actuales
              </label>
              <textarea
                type="text"
                name="competencias"
                className="form-control"
                value={formDataa.competencias}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="principales" className="text-muted fw-bold">
                Principales Barreras:
              </label>
              <textarea
                type="text"
                name="principales"
                className="form-control"
                value={formDataa.principales}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="estado" className="text-muted fw-bold">
                Estado actual en relacion con los DBA
              </label>
              <textarea
                type="text"
                name="estado"
                className="form-control"
                value={formDataa.estado}
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

export default Modal_valoraciones;
