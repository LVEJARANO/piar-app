import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Lista_materias } from "../../services/service_piar";

function Grado_materias_form({ formData, setFormData, select_estudiantes }) {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Lista_materias();
        setMaterias(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);

  const addDocenteMateria = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      docente_materia: [
        ...prevFormData.docente_materia,
        { materias: [], profesor: 0 },
      ],
    }));
  };

  const removeDocenteMateria = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      docente_materia: prevFormData.docente_materia.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <button  className="btn btn-success mt-3" type="button" onClick={addDocenteMateria}>
          Agregar Docente Materia
        </button>
      </div>
      {formData.docente_materia.map((docente, index) => (
        <div key={index}>
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <label  htmlFor="profesor" className="text-muted fw-bold">Profesor:</label>
              <Select
                id={`profesor-${index}`}
                name="profesor"
                options={select_estudiantes?.map((option) => ({
                  value: option.id,
                  label: `${option.documento} - ${option.primer_nombre} ${
                    option.segundo_nombre || ""
                  } ${option.primer_apellido} ${option.segundo_apellido || ""}`,
                }))}
                value={
                  docente.profesor
                    ? {
                        value: docente.profesor,
                        label: select_estudiantes?.find(
                          (option) => option.id === docente.profesor
                        )
                          ? `${
                              select_estudiantes.find(
                                (option) => option.id === docente.profesor
                              ).documento
                            } - ${
                              select_estudiantes.find(
                                (option) => option.id === docente.profesor
                              ).primer_nombre
                            } ${
                              select_estudiantes.find(
                                (option) => option.id === docente.profesor
                              ).segundo_nombre || ""
                            } ${
                              select_estudiantes.find(
                                (option) => option.id === docente.profesor
                              ).primer_apellido
                            } ${
                              select_estudiantes.find(
                                (option) => option.id === docente.profesor
                              ).segundo_apellido || ""
                            }`
                          : "",
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  setFormData((prevFormData) => {
                    const updatedDocentes = [...prevFormData.docente_materia];
                    updatedDocentes[index].profesor = selectedOption
                      ? selectedOption.value
                      : null;
                    return {
                      ...prevFormData,
                      docente_materia: updatedDocentes,
                    };
                  });
                }}
                placeholder="Seleccionar..."
                isClearable
                isSearchable
                required
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <label htmlFor="materias" className="text-muted fw-bold">
                Materias
              </label>
              <Select
                id={`materias-${index}`}
                name="materias"
                options={materias?.map((option) => ({
                  value: option.id,
                  label: option.descripcion,
                }))}
                value={
                  docente.materias?.map((materiaId) => {
                    const materia = materias.find(
                      (option) => option.id === materiaId
                    );
                    return {
                      value: materiaId,
                      label: materia?.descripcion || "",
                    };
                  }) || []
                }
                onChange={(selectedOptions) => {
                  const selectedIds = selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [];
                  setFormData((prevFormData) => {
                    const updatedDocentes = [...prevFormData.docente_materia];
                    updatedDocentes[index].materias = selectedIds;
                    return {
                      ...prevFormData,
                      docente_materia: updatedDocentes,
                    };
                  });
                }}
                placeholder="Seleccionar..."
                isClearable
                isSearchable
                isMulti
                required
              />
            </div>
            <div className="col-sm-12 col-md-3 mt-4">
              <button className="btn btn-danger"
                type="button"
                onClick={() => removeDocenteMateria(index)}
              >
                Eliminar 
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Grado_materias_form;
