import React, { useEffect, useState } from "react";
import Grado_materias_form from "./Grado_materias_form";
import {
  PersonasSelect,
  Post_matricula,
  Buscargrados_id,
  Put_grados,
} from "../../services/service_piar";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function Grado_form() {
  const navigate = useNavigate();
  const { idsede } = useParams();
  const { idanual } = useParams();
  const { id } = useParams();

  const idSedeInt = parseInt(idsede, 10); // El 10 es la base para la conversión decimal
  const idAnualInt = parseInt(idanual, 10);

  const [formData, setFormData] = useState({
    nombre_grado: "",
    anual: idAnualInt,
    sede: idSedeInt,
    estudiantes: [],
    profesor: 0,
    docenteorienta: 0,
    docenteapoyo: 0,
    docente_materia: [
      {
        materias: [],
        profesor: 0,
      },
    ],
  });

  const [select_estudiantes, setselect_estudiantes] = useState([]);

  const [select_profesores, setselect_profesores] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PersonasSelect("ESTUDIANTE");
        const responseprofes = await PersonasSelect("PROFESOR");

        setselect_estudiantes(response.data);
        setselect_profesores(responseprofes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchTaskDetails = async () => {
        try {
          const response = await Buscargrados_id(id);
          console.log("🚀 ~ fetchTaskDetails ~ response mmm:", response);

          const {
            nombre_grado,
            anual,
            sede,
            estudiantes,
            profesor,
            docente_materia,
            docenteorienta,
            docenteapoyo,
          } = response.data;
          setFormData({
            nombre_grado,
            anual,
            sede,
            estudiantes,
            profesor,
            docente_materia,
            docenteorienta,
            docenteapoyo,
          });
          // validarfechanacimiento();
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      };
      fetchTaskDetails();
    }
  }, [id]);

  // Manejador para cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    if (isSubmitting) return; // Evita múltiples envíos si ya se está enviando

    setIsSubmitting(true); // Deshabilita el botón de submit mientras se envía
    try {
      const response = id
        ? await Put_grados(id, formData)
        : await Post_matricula(formData);

      toast.success("Registro Exitoso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/dashboard/matricula-grado/${idSedeInt}/${idAnualInt}`);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error("Error al Registrar una persona", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false); // Rehabilita el botón de submit después de que se complete el envío
    }
  };

  const handleChangee = (selectedValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profesor: selectedValue,
    }));
  };

  return (
    <div className="p-4">
      <div className="col-12">
        <h4 className="text-center my-4"> Nuevo Grado</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3 my-2">
              <label htmlFor="nombre_grado" className="text-muted fw-bold">
                Nombre del Grado:
              </label>
              <input
                type="text"
                name="nombre_grado"
                className="form-control"
                value={formData.nombre_grado}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-3 my-2">
              <label htmlFor="profesor" className="text-muted fw-bold">
                Profesor Director:
              </label>
              <Select
                id="profesor"
                name="profesor"
                options={select_profesores?.map((option) => ({
                  value: option.id, // El id del estudiante
                  label: `${option.documento} - ${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${
                    option.segundo_apellido || ""
                  } - ${option.documento}`, // Nombre completo y documento
                  nombre: `${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${
                    option.segundo_apellido || ""
                  } `, // Nombre completo y documento
                }))}
                value={
                  formData.profesor
                    ? {
                        value: formData.profesor, // El id del profesor
                        label: select_profesores?.find(
                          (option) => option.id === formData.profesor
                        )
                          ? `${
                              select_profesores.find(
                                (option) => option.id === formData.profesor
                              )?.documento
                            } - ${
                              select_profesores.find(
                                (option) => option.id === formData.profesor
                              )?.primer_nombre
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.profesor
                              )?.segundo_nombre || ""
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.profesor
                              )?.primer_apellido
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.profesor
                              )?.segundo_apellido || ""
                            }`
                          : "", // Concatenamos el documento, nombre y apellidos
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  console.log("Selected Option:", selectedOption); // Para depuración
                  if (selectedOption) {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      profesor: selectedOption.value, // Guardamos el id del profesor
                    }));
                  }
                }}
                placeholder="Seleccionar..."
                isClearable
                isSearchable
                required
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-3 my-2">
              <label htmlFor="docenteapoyo" className="text-muted fw-bold">
                Docente de Apoyo:
              </label>
              <Select
                id="docenteapoyo"
                name="docenteapoyo"
                options={select_profesores?.map((option) => ({
                  value: option.id, // El id del estudiante
                  label: `${option.documento} - ${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${
                    option.segundo_apellido || ""
                  } - ${option.documento}`, // Nombre completo y documento
                  nombre: `${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${
                    option.segundo_apellido || ""
                  } `, // Nombre completo y documento
                }))}
                value={
                  formData.docenteapoyo
                    ? {
                        value: formData.docenteapoyo, // El id del profesor
                        label: select_profesores?.find(
                          (option) => option.id === formData.docenteapoyo
                        )
                          ? `${
                              select_profesores.find(
                                (option) => option.id === formData.docenteapoyo
                              )?.documento
                            } - ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteapoyo
                              )?.primer_nombre
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteapoyo
                              )?.segundo_nombre || ""
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteapoyo
                              )?.primer_apellido
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteapoyo
                              )?.segundo_apellido || ""
                            }`
                          : "", // Concatenamos el documento, nombre y apellidos
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  console.log("Selected Option:", selectedOption); // Para depuración
                  if (selectedOption) {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      docenteapoyo: selectedOption.value, // Guardamos el id del profesor
                    }));
                  }
                }}
                placeholder="Seleccionar..."
                isClearable
                isSearchable
                required
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-3 my-2">
              <label htmlFor="docenteorienta" className="text-muted fw-bold">
                Docente Orientadora:
              </label>
              <Select
                id="docenteorienta"
                name="docenteorienta"
                options={select_profesores?.map((option) => ({
                  value: option.id, // El id del estudiante
                  label: `${option.documento} - ${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${
                    option.segundo_apellido || ""
                  } - ${option.documento}`, // Nombre completo y documento
                  nombre: `${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${
                    option.segundo_apellido || ""
                  } `, // Nombre completo y documento
                }))}
                value={
                  formData.docenteorienta
                    ? {
                        value: formData.docenteorienta, // El id del profesor
                        label: select_profesores?.find(
                          (option) => option.id === formData.docenteorienta
                        )
                          ? `${
                              select_profesores.find(
                                (option) => option.id === formData.docenteorienta
                              )?.documento
                            } - ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteorienta
                              )?.primer_nombre
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteorienta
                              )?.segundo_nombre || ""
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteorienta
                              )?.primer_apellido
                            } ${
                              select_profesores.find(
                                (option) => option.id === formData.docenteorienta
                              )?.segundo_apellido || ""
                            }`
                          : "", // Concatenamos el documento, nombre y apellidos
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  console.log("Selected Option:", selectedOption); // Para depuración
                  if (selectedOption) {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      docenteorienta: selectedOption.value, // Guardamos el id del profesor
                    }));
                  }
                }}
                placeholder="Seleccionar..."
                isClearable
                isSearchable
                required
              />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6 my-2">
              <label htmlFor="centro_costo" className="text-muted fw-bold">
                Seleccionar Estudiantes
              </label>
              <Select
                id="estudiantes"
                name="estudiantes"
                options={select_estudiantes?.map((option) => ({
                  value: option.id,
                  label: `${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${
                    option.segundo_apellido || ""
                  } - ${option.documento}`,
                  nombre: `${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${option.segundo_apellido || ""}`,
                }))}
                value={
                  formData.estudiantes?.map((estudianteId) => {
                    const municipio = select_estudiantes.find(
                      (option) => option.id === estudianteId
                    );
                    return {
                      value: estudianteId,
                      label: `${municipio?.primer_nombre || ""} ${
                        municipio?.segundo_nombre || ""
                      } ${municipio?.primer_apellido || ""} ${
                        municipio?.segundo_apellido || ""
                      } - ${municipio?.documento || ""}`,
                    };
                  }) || []
                }
                onChange={(selectedOptions) => {
                  console.log("Selected Options:", selectedOptions);
                  const selectedIds = selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [];
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    estudiantes: selectedIds,
                  }));
                }}
                placeholder="Seleccionar..."
                isClearable
                isSearchable
                isMulti
                required
              />
            </div>

            <div
              className="col-12 mt-5"
              style={{ position: "relative", textAlign: "center" }}
            >
              <hr style={{ borderColor: "green", borderWidth: "2px" }} />
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "-12px", // Ajusta la posición del texto según sea necesario
                  transform: "translateX(-50%)",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Elegir al profesor y las materias
              </span>
            </div>
            <div className="col-12">
              {" "}
              <Grado_materias_form
                formData={formData}
                setFormData={setFormData}
                select_estudiantes={select_profesores}
              />
            </div>
          </div>
          <div align="center">
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={isSubmitting}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Grado_form;
