import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  Crearpersona,
  Editarpersona,
  Buscarpersona,
} from "../../../services/service_piar";

function Persona_form() {
  const navigate = useNavigate();
  const { id } = useParams();
  const catalogo = JSON.parse(localStorage.getItem("catalogo"));
  const municpios_json = JSON.parse(localStorage.getItem("municipios"));
  const ListatipoDocumento = catalogo.filter(
    (item) => item.tipo === "TipoDocumento"
  );
  const ListaTipoSexo = catalogo.filter((item) => item.tipo === "TipoSexo");
  const roles = catalogo.filter((item) => item.tipo === "rol");
  const victima = catalogo.filter((item) => item.tipo === "victima");
  const etnia = catalogo.filter((item) => item.tipo === "etnia");
  const discapacidad = catalogo.filter((item) => item.tipo === "discapacidad");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío

  const atraspersonas = () => {
    navigate(`/dashboard/personas`);
  };

  const [formData, setFormData] = useState({
    tipo_documento: "",
    documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    fecha_nacimiento: "",
    municipio_nacimiento: "",
    sexo: "",
    correo: "",
    telefono: "",   
    rol: "",
    etnia:"",
    victima:"",
    discapacidad:"",
    acudiente:"",
  });

  useEffect(() => {
    if (id) {
      const fetchTaskDetails = async () => {
        try {
          const response = await Buscarpersona(id);

          const {
            tipo_documento,
            documento,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            fecha_nacimiento,
            municipio_nacimiento,
            sexo,
            correo,
            telefono,
            rol,
            etnia,
            victima,
            discapacidad,
            acudiente,
          } = response.data;
          setFormData({
            tipo_documento,
            documento,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            fecha_nacimiento,
            municipio_nacimiento,
            sexo,
            correo,
            telefono,
            rol,
            etnia,
            victima,
            discapacidad,
            acudiente,
          });
          // validarfechanacimiento();
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      };
      fetchTaskDetails();
    }
  }, [id]);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "municipio_nacimiento"
          ? parseInt(value)
          : name === "correo"
          ? value.toLowerCase()
          : value.toUpperCase(),
    });
  };

  const requiredStyle = {
    color: 'red',  // Estilo en línea para el asterisco
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    if (isSubmitting) return; // Evita múltiples envíos si ya se está enviando

    setIsSubmitting(true); // Deshabilita el botón de submit mientras se envía
    try {
      const response = id
        ? await Editarpersona(id, formData)
        : await Crearpersona(formData);

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
      navigate(`/dashboard/personas`);
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

  return (
    <div>
      <div className="col-12">
        <h4 className="text-center my-4"> Nueva Persona </h4>
      </div>
      <div className="col-12">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Tipo Documento (<span style={requiredStyle}>*</span>): </label>
              <select
                id="tipo_documento"
                name="tipo_documento"
                className="form-select"
                aria-label="Default select example"
                value={formData.tipo_documento}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {ListatipoDocumento.map((option, index) => (
                  <option key={option.opcion} value={option.opcion}>
                    {option.opcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Documento (<span style={requiredStyle}>*</span>): </label>
              <input
                type="number"
                name="documento"
                className="form-control"
                value={formData.documento}
                onChange={handleChange}
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Primer Nombre (<span style={requiredStyle}>*</span>):</label>
              <input
                type="text"
                name="primer_nombre"
                className="form-control"
                value={formData.primer_nombre}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Segundo Nombre:</label>
              <input
                type="text"
                name="segundo_nombre"
                className="form-control"
                value={formData.segundo_nombre}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Primer Apellido (<span style={requiredStyle}>*</span>):</label>
              <input
                type="text"
                name="primer_apellido"
                className="form-control"
                value={formData.primer_apellido}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Segundo Apellido:</label>
              <input
                type="text"
                name="segundo_apellido"
                className="form-control"
                value={formData.segundo_apellido}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Fecha de Nacimiento (<span style={requiredStyle}>*</span>):</label>
              <input
                type="date"
                name="fecha_nacimiento"
                className="form-control"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Municipio de Nacimiento (<span style={requiredStyle}>*</span>):</label>
              <Select
                id="municipio_nacimiento"
                name="municipio_nacimiento"
                options={municpios_json?.map((option) => ({
                  value: option.id,
                  label: option.full_name,
                  nombre: option.full_name,
                }))}
                value={
                  formData.municipio_nacimiento
                    ? {
                        value: formData.municipio_nacimiento,
                        label:
                          municpios_json?.find(
                            (option) =>
                              option.id === formData.municipio_nacimiento
                          )?.full_name || "", // Busca el nombre correspondiente al id
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  handleChange({
                    target: {
                      name: "municipio_nacimiento",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  });
                }}
                placeholder="Seleccionar..."
                isClearable
                isSearchable
                required
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Sexo (<span style={requiredStyle}>*</span>):</label>
              <select
                id="sexo"
                name="sexo"
                className="form-select"
                aria-label="Default select example"
                value={formData.sexo}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                {ListaTipoSexo.map((option, index) => (
                  <option key={option.opcion} value={option.opcion}>
                    {option.opcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Correo:</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Telefono (<span style={requiredStyle}>*</span>):</label>
              <input
                type="number"
                name="telefono"
                className="form-control"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Padre/Madre/Acudiente:</label>
              <input
                type="text"
                name="acudiente"
                className="form-control"
                value={formData.acudiente}
                onChange={handleChange}               
              />
            </div>
            
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Discapacidad (<span style={requiredStyle}>*</span>):</label>
              <select
                id="discapacidad"
                name="discapacidad"
                className="form-select"
                aria-label="Default select example"
                value={formData.discapacidad}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                {discapacidad.map((option, index) => (
                  <option key={option.opcion} value={option.opcion}>
                    {option.opcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Rol (<span style={requiredStyle}>*</span>):</label>
              <select
                id="rol"
                name="rol"
                className="form-select"
                aria-label="Default select example"
                value={formData.rol}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                {roles.map((option, index) => (
                  <option key={option.opcion} value={option.opcion}>
                    {option.opcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Etnia (<span style={requiredStyle}>*</span>):</label>
              <select
                id="etnia"
                name="etnia"
                className="form-select"
                aria-label="Default select example"
                value={formData.etnia}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                {etnia.map((option, index) => (
                  <option key={option.opcion} value={option.opcion}>
                    {option.opcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 my-2">
              <label>Victima (<span style={requiredStyle}>*</span>):</label>
              <select
                id="victima"
                name="victima"
                className="form-select"
                aria-label="Default select example"
                value={formData.victima}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                {victima.map((option, index) => (
                  <option key={option.opcion} value={option.opcion}>
                    {option.opcion}
                  </option>
                ))}
              </select>
            </div>
            <div align="center">
              <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Persona_form;
