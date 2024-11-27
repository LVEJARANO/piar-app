import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { toast } from "react-toastify";

import { Post_diagnistico ,Put_diagnostico,Diagnosticoid} from "../../services/service_piar";

function Modal_diagnostico({ onClose, setMostrarModal, id, idd }) {
  const idpersona = parseInt(id, 10);

  const [formData, setFormData] = useState({
    descripcion: "",
    persona: idpersona,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const response = idd
      ? await Put_diagnostico(idd, formData)
      : await Post_diagnistico(formData);

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
    if (idd) {
      const fetchTaskDetails = async () => {
        try {
          const response = await Diagnosticoid(idd);


          const { descripcion, persona } = response.data;
          setFormData({
            descripcion,
            persona,
          });
          // validarfechanacimiento();
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      };
      fetchTaskDetails();
    }
  }, [idd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal show={true} onHide={onClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Agregar </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="descripcion" className="text-muted fw-bold">
                Diagnostico:
              </label>
              <textarea
                type="text"
                name="descripcion"
                className="form-control"
                value={formData.descripcion}
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

export default Modal_diagnostico;
