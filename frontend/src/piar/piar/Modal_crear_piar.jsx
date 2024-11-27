import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post_piar, piars_id ,Put_piar} from "../../services/service_piar";

function Modal_crear_piar({ onClose, setMostrarModal, formData ,id}) {
  const idpersona = parseInt(formData.idpersona, 10);
  const anual_id = parseInt(formData.anual, 10);
  const sede_id = parseInt(formData.sede, 10);
  const Grado_id = parseInt(formData.grado, 10);

  const [formDataa, setFormDataa] = useState({
    nombre: "",
    anual: anual_id,
    sede: sede_id,
    grado: Grado_id,
    estudiante: idpersona,    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDataa);
    try {
      
      const response = id
      ? await Put_piar(id, formDataa)
      : await Post_piar(formDataa);
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
          const response = await piars_id(id);

          const { nombre, anual, sede, grado, estudiante } = response.data;
          setFormDataa({
            nombre,
            anual,
            sede,
            grado,
            estudiante,
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
      <Modal show={true} onHide={onClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Agregar </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="col-sm-12 col-md-12  my-2">
              <label htmlFor="nombre" className="text-muted fw-bold">
                Piar:
              </label>
              <textarea
                type="nombre"
                name="nombre"
                className="form-control"
                value={formDataa.nombre}
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

export default Modal_crear_piar;
