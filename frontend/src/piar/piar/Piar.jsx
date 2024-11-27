import React, { useEffect, useState } from "react";
import { Lista_piar } from "../../services/service_piar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal_crear_piar from "./Modal_crear_piar";
import { Card, Button } from "react-bootstrap";
import Opciones_piar from "./Opciones_piar";
import { useNavigate, useParams } from "react-router-dom";
import Modal_soporte_piar from "./Modal_soporte_piar";

function Piar({ formData, setFormData }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModals, setMostrarModals] = useState(false);
  const [piarlist, setpiarlist] = useState([]);
  const [opcionesPiarData, setOpcionesPiarData] = useState(null);
  const [idpiar, setidpiar] = useState("");

  const { idsede } = useParams();
  const { idanual } = useParams();
  const { idgrado } = useParams();
  const { idestu } = useParams();

  const storedUser = JSON.parse(localStorage.getItem("data"));
  const isDocenteApoyoPresent =
    storedUser &&
    storedUser.modulo_gpo_permiso &&
    Array.isArray(storedUser.modulo_gpo_permiso.submodulo) &&
    storedUser.modulo_gpo_permiso.submodulo.some(
      (sub) => sub.nombre === "DOCENTE_APOYO"
    );

  const navigate = useNavigate();

  const navigatpdf = (id) => {
    navigate(
      `/dashboard/pdf-piar/${idsede}/${idanual}/${idgrado}/${idestu}/${id}`
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsedi = await Lista_piar(
          formData.anual,
          formData.sede,
          formData.grado,
          formData.idpersona
        );
        console.log("🚀 ~ fetchData ~ piarrrrrrrrrr:", responsedi);
        setpiarlist(responsedi.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [mostrarModal, formData.grado, formData.idpersona]);

  const abrirModal = () => {
    setMostrarModal(true);
    setidpiar("");
  };

  const abrirModaleditar = (id) => {
    setMostrarModal(true);
    setidpiar(id);
  };

  const abrirModaleditars = (id) => {
    setMostrarModals(true);
    setidpiar(id);
  };

  const toggleVerMas = (item) => {
    // Alterna entre mostrar y ocultar Opciones_piar
    if (opcionesPiarData?.id === item.id) {
      setOpcionesPiarData(null); // Cierra Opciones_piar si ya está seleccionado
    } else {
      setOpcionesPiarData(item); // Muestra Opciones_piar para el elemento seleccionado
    }
  };

  return (
    <div className="">
      <div className="col-12 mt-3">
        <h4 className="text-center text-danger"> PIAR</h4>
        {isDocenteApoyoPresent ? (
          <>
            {" "}
            <div className="col-12 d-flex justify-content-between">
              <button className="btn btn-success" onClick={abrirModal}>
                <FontAwesomeIcon icon="fa-solid fa-plus" /> Nuevo
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="col-12 mt-4">
        {Array.isArray(piarlist) && piarlist.length !== 0 ? (
          <div className="row g-4">
            {piarlist.map((item, index) => (
              <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                <Card className="shadow-sm border h-100 card-hover">
                  <Card.Body>
                    <Card.Title className="text-center">
                      <strong>{item.nombre}</strong>
                    </Card.Title>

                    <div className="d-flex flex-wrap justify-content-center m-1">
                      <Button
                        className={`btn btn-sm m-1 ${
                          opcionesPiarData?.id === item.id
                            ? "btn-danger"
                            : "btn-secondary"
                        }`}
                        onClick={() => toggleVerMas(item)}
                      >
                        {opcionesPiarData?.id === item.id
                          ? "Cerrar"
                          : "Ver más"}
                      </Button>
                      {isDocenteApoyoPresent ? (
                        <>
                          <button
                            className="btn btn-primary btn-sm m-1"
                            onClick={() => abrirModaleditar(item?.id)}
                          >
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />{" "}
                            Editar
                          </button>
                        </>
                      ) : null}

                      <button
                        className="btn btn-outline-danger btn-sm m-1"
                        onClick={() => navigatpdf(item?.id)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-file-pdf" /> PDF
                      </button>

                      <button
                        className="btn btn-outline-success btn-sm m-1"
                        onClick={() => abrirModaleditars(item?.id)}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-file-pdf" /> Subir
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm m-1"
                        onClick={() => {
                          if (item?.soporte_url) {
                            window.open(item.soporte_url, "_blank"); // Abre la URL en una nueva pestaña
                          } else {
                            alert("El archivo no está disponible.");
                          }
                        }}
                      >
                        <FontAwesomeIcon icon="fa-solid fa-file-pdf" /> Piar
                        Firmado
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">
            <h5 className="text-muted">No hay elementos disponibles</h5>
          </div>
        )}

        {mostrarModal && (
          <Modal_crear_piar
            onClose={() => setMostrarModal(false)}
            setMostrarModal={setMostrarModal}
            formData={formData}
            id={idpiar}
          />
        )}

        {mostrarModals && (
          <Modal_soporte_piar
            onClose={() => setMostrarModals(false)}
            setMostrarModal={setMostrarModals}
            id={idpiar}
          />
        )}
      </div>

      {/* Render Opciones_piar outside of the cards */}
      {opcionesPiarData && (
        <div className="col-12 mt-3">
          <Opciones_piar data={opcionesPiarData} formData={formData} />
        </div>
      )}
    </div>
  );
}

export default Piar;
