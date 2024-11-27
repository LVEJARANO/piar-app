import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Updatesoporte
} from "../../services/service_piar";

function Modal_soporte_piar({ onClose, setMostrarModal, id }) {


  const [formData, setFormData] = useState({
    soporte: null, // Archivo se almacena como null inicialmente
  });

  // Manejar el cambio de archivo
  const handleInputChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Solo el primer archivo (en caso de ser múltiples)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await Updatesoporte(id, formData)
       

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



  return (
    <div>
      <Modal show={true} onHide={onClose} centered backdrop="static"size="lg"  style={{ zIndex: 1500 }}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
      

            <div className="col-sm-12 my-3">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Soporte PIAR
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    checked={formData.soporte}
                    name="soporte"
                    onChange={handleInputChange}
                  />
                </div>
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

export default Modal_soporte_piar;
