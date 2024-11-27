import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Post_contextogenaral,
  contexto_id,
  Put_contexto,
} from "../../services/service_piar";

function Modal_contexto({ onClose, setMostrarModal, data, id }) {
  const piar_id = parseInt(data.id, 10);

  const [formDataa, setFormDataa] = useState({
    descripacion: "",
    familiar: "",
    otros: "",
    piar: piar_id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDataa);
    try {
      const response = id
        ? await Put_contexto(id, formDataa)
        : await Post_contextogenaral(formDataa);

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
          const response = await contexto_id(id);

          const { descripacion, familiar, otros, piar } = response.data;
          setFormDataa({
            descripacion,
            familiar,
            otros,
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
      <Modal
        show={true}
        onHide={onClose}
        centered
        backdrop="static"
        style={{ zIndex: 1500 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="descripacion" className="text-muted fw-bold">
                Descripción general del/a estudiante
              </label>
              <textarea
                type="nombre"
                name="descripacion"
                className="form-control"
                value={formDataa.descripacion}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="familiar" className="text-muted fw-bold">
                Contexto familiar:
              </label>
              <textarea
                type="text"
                name="familiar"
                className="form-control"
                value={formDataa.familiar}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="otros" className="text-muted fw-bold">
                Otros contextos:
              </label>
              <textarea
                type="text"
                name="otros"
                className="form-control"
                value={formDataa.otros}
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

export default Modal_contexto;
