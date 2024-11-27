import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import logo from "../../assets/img/logo_piar.png";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Getpiarpdf,
  Lista_diagnostico_persona,
} from "../../services/service_piar";
import { differenceInYears } from "date-fns";

const Pdf_piear = () => {
  const { idsede } = useParams();
  const { idanual } = useParams();
  const { idgrado } = useParams();
  const { idestu } = useParams();
  const { idpiar } = useParams();

  const [piarget, setpiarget] = useState([]);

  const [diagnostico, setdiagnostico] = useState([]);
  const [contexto, setcontexto] = useState([]);
  const [valoracion, setvaloracion] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsedi = await Lista_diagnostico_persona(idestu);
        console.log("🚀 ~ fetchData ~ responsedijjjjj:", responsedi);
        setdiagnostico(responsedi.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
        setdiagnostico([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getpiarpdf(idpiar);
        console.log("🚀 ~ fetchData ~ response grados :", response);
        setpiarget(response.data);
        setcontexto(response.data.piar_contexto[0]);
        setvaloracion(response.data.piar_valoracion[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);
  const handleDownloadPDF = () => {
    const pdfElement = document.getElementById("pdf-container");
    const fileNames = "formato";
  
    if (pdfElement) {
      html2pdf()
        .set({
          margin: [10, 10, 10, 10], // Márgenes: superior, derecho, inferior, izquierdo
          filename: fileNames,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 }, // Asegurar buena calidad
          jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // Control avanzado de saltos de página
        })
        .from(pdfElement)
        .save();
    }
  };
  

  const listaProfesores = piarget.grado?.docente_materia?.map(
    (item) => item.profesor
  );
  console.log("🚀 ~ listaProfesores:", listaProfesores);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES"); // Formato corto: dd/mm/aaaa
  };

  const formatDates = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0"); // Formatear el día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, "0"); // El mes comienza desde 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
    },
    formatoContainer: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse", // Asegura que los bordes no se dupliquen
      border: "1px solid #6c757d", // Define un borde general para la tabla
    },
    thTd: {
      padding: "3px 8px",
      textAlign: "left",
      border: "1px solid #6c757d", // Define un borde individual para las celdas
    },
    imgContainer: {
      textAlign: "center",
      border: "1px solid #6c757d", // Asegura que las imágenes tengan borde
    },
    tituloc: {
      fontSize: "18px",
      border: "1px solid #6c757d",
    },
    tdp: {
      padding: "0", // Elimina padding interno para ocupar toda la celda
      //textAlign: "center", // Alineación del contenido
      border: "1px solid #6c757d", // Borde alrededor de cada celda
      margin: "1px",
    },
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={handleDownloadPDF}>
        <span style={{ fontSize: "13px" }}>
          {" "}
          <FontAwesomeIcon icon="fa-solid fa-file-arrow-down" />
        </span>
      </button>

      <div id="pdf-container">
        <div style={styles.formatoContainer}>
          <style>{`
                /* Estilos CSS personalizados */
                body {
                    font-family: Arial, sans-serif;
                }
                .formato-container {
                    max-width: 800px;
                    margin: 0 auto;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 4px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
            `}</style>

          <table style={styles.table}>
            <tbody>
              <tr style={{ ...styles.thTd, ...styles.tituloc }}>
                <td
                  width="20%"
                  style={{ ...styles.thTd, ...styles.imgContainer }}
                >
                  <img
                    src={logo}
                    width="60%"
                    alt="Logo"
                    style={{ padding: "0px" }}
                  />
                </td>
                <td
                  colSpan="4"
                  style={{
                    ...styles.thTd,
                    ...styles.tituloc,
                    textAlign: "center",
                    padding: "0",
                  }}
                >
                  <strong
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    INSTITUCION EDUCATIVA RAFAEL POMBO - POPAYAN
                  </strong>
                  <p
                    style={{
                      fontSize: "12px",
                      fontFamily: "Arial, sans-serif",
                      margin: "0",
                    }}
                  >
                    Resolución SEM 20141700023524 - NIT:817003464-1
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontFamily: "Arial, sans-serif",
                      margin: "0",
                    }}
                  >
                    DANE: Centro 119001003990, Antonio Nariño 119001000516,
                    Valencia 11900100475
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontFamily: "Arial, sans-serif",
                      margin: "0",
                    }}
                  >
                    <strong
                      style={{
                        fontFamily: "Arial, sans-serif",
                        display: "block",
                      }}
                    >
                      Educación Inclusiva y Atención a la Diversidad
                    </strong>
                  </p>
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontFamily: "Arial, sans-serif",
                    margin: "0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontFamily: "Arial, sans-serif",
                      margin: "0",
                    }}
                  >
                    {" "}
                    SEDE {piarget.sede?.descripcion} - {piarget.sede?.direccion}{" "}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontFamily: "Arial, sans-serif",
                      margin: "0",
                    }}
                  >
                    telefono:{piarget.sede?.telefono}
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{
                    ...styles.thTd,
                    textAlign: "center",
                    background: "#3b81e96b",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    Formato institucional para actualización del Plan Individual
                    de Ajustes Razonables{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",

                            fontSize: "13px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Fecha de registro
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {formatDate(piarget.createdAt)}
                          </p>
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            Actualización
                          </p>
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                          }}
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",

                            fontSize: "13px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Director de grupo
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {`${piarget.grado?.profesor.primer_nombre} ${
                              piarget.grado?.profesor.segundo_nombre || ""
                            } ${piarget.grado?.profesor.primer_apellido} ${
                              piarget.grado?.profesor.segundo_apellido
                            }`.trim()}
                          </p>
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",

                            fontSize: "13px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Sede educativa
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {piarget.sede?.descripcion}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{ ...styles.thTd, background: "#3b81e96b" }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    a) Identificación del/a estudiante
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",

                            fontSize: "13px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Nombre completo
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {`${piarget.estudiante?.primer_nombre} ${
                              piarget.estudiante?.segundo_nombre || ""
                            } ${piarget.estudiante?.primer_apellido} ${
                              piarget.estudiante?.segundo_apellido
                            }`.trim()}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan="6"
                          style={{ ...styles.tdp, textAlign: "center" }}
                        >
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              // border: "0.5px solid #ccc",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    ...styles.tdp,
                                    border: "0.5px solid #ccc",
                                    width: "25%",
                                    background: "#5590e740",

                                    fontSize: "12px",
                                    fontFamily: "Arial, sans-serif",
                                    margin: "0",
                                  }}
                                >
                                  Documento de id.
                                </td>
                                <td
                                  style={{
                                    ...styles.tdp,
                                    border: "0.5px solid #ccc",
                                    width: "25%",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      fontFamily: "Arial, sans-serif",
                                      margin: "0",
                                    }}
                                  >
                                    {" "}
                                    {piarget.estudiante?.documento}
                                  </p>
                                </td>
                                <td
                                  style={{
                                    ...styles.tdp,
                                    border: "0.5px solid #ccc",
                                    width: "25%",
                                    background: "#5590e740",

                                    fontSize: "12px",
                                    fontFamily: "Arial, sans-serif",
                                    margin: "0",
                                  }}
                                >
                                  Fecha de nacimiento
                                </td>
                                <td
                                  style={{
                                    ...styles.tdp,
                                    border: "0.5px solid #ccc",
                                    width: "25%",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      fontFamily: "Arial, sans-serif",
                                      margin: "0",
                                    }}
                                  >
                                    {" "}
                                    {formatDates(
                                      piarget.estudiante?.fecha_nacimiento
                                    )}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "16%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Edad actual
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "16%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {differenceInYears(
                              new Date(),
                              new Date(piarget.estudiante?.fecha_nacimiento)
                            )}{" "}
                            Años
                          </p>
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "16%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Grado actual
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "16%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {piarget.grado?.nombre_grado}
                          </p>
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "16%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Discapacidad
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "16%",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {piarget.estudiante?.discapacidad}{" "}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Padre/Madre/Acudiente
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {piarget.estudiante?.acudiente}{" "}
                          </p>
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Celular
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {piarget.estudiante?.telefono}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "16%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Diagnóstico
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "84%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {diagnostico.descripcion}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{ ...styles.thTd, background: "#3b81e96b" }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    b) Contexto general del/a estudiante
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Descripción general del/a estudiante
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {contexto?.descripacion}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Contexto familiar
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {contexto?.familiar}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Otros contextos
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {contexto?.otros}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{ ...styles.thTd, background: "#3b81e96b" }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    c) Valoración pedagógica del/a estudiante{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Competencias y habilidades actuales
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {valoracion?.competencias}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Principales barreras
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {valoracion?.principales}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Estado actual en relación con los DBA
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              fontFamily: "Arial, sans-serif",
                              margin: "0",
                            }}
                          >
                            {" "}
                            {valoracion?.estado}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{ ...styles.thTd, background: "#3b81e96b" }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    d) Objetivos y metas de aprendizaje
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Objetivos y metas para el año escolar
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          {piarget.piar_objetivos?.map((obj) => (
                            <div key={obj.id} style={{ marginBottom: "10px" }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                <strong>Materia:</strong>{" "}
                                {obj.materia.descripcion}
                              </p>

                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                {obj.metas}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Retroalimentación y evaluación del proceso
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          {piarget.piar_objetivos?.map((obj) => (
                            <div key={obj.id} style={{ marginBottom: "10px" }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                <strong>Materia:</strong>{" "}
                                {obj.materia.descripcion}
                              </p>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                {obj.evaluacion}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{ ...styles.thTd, background: "#3b81e96b" }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    e) Ajustes razonables y apoyos pedagógicos{" "}
                  </span>
                </td>
              </tr>

              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Ajustes curriculares
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          {piarget.piar_rasonnables?.map((obj) => (
                            <div key={obj.id} style={{ marginBottom: "10px" }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                <strong>Materia:</strong>{" "}
                                {obj.materia.descripcion}
                              </p>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                {obj.ajustes}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Ajustes didácticos y metodológicos
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          {piarget.piar_rasonnables?.map((obj) => (
                            <div key={obj.id} style={{ marginBottom: "10px" }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                <strong>Materia:</strong>{" "}
                                {obj.materia.descripcion}
                              </p>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                {obj.didacticos}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Ajustes en la evaluación
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          {piarget.piar_rasonnables?.map((obj) => (
                            <div key={obj.id} style={{ marginBottom: "10px" }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                <strong>Materia:</strong>{" "}
                                {obj.materia.descripcion}
                              </p>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                {obj.evaluacion}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Actividades adicionales
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          {piarget.piar_rasonnables?.map((obj) => (
                            <div key={obj.id} style={{ marginBottom: "10px" }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                <strong>Materia:</strong>{" "}
                                {obj.materia.descripcion}
                              </p>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                {obj.adicionales}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="6" style={{ ...styles.tdp, textAlign: "center" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "0.5px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "25%",
                            background: "#5590e740",
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          Actividades en casa
                        </td>
                        <td
                          style={{
                            ...styles.tdp,
                            border: "0.5px solid #ccc",
                            width: "75%",
                          }}
                        >
                          {piarget.piar_rasonnables?.map((obj) => (
                            <div key={obj.id} style={{ marginBottom: "10px" }}>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                <strong>Materia:</strong>{" "}
                                {obj.materia.descripcion}
                              </p>
                              <p
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Arial, sans-serif",
                                  margin: "0",
                                }}
                              >
                                {obj.casa}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{ ...styles.thTd, background: "#3b81e96b" }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    f) Formalización y acuerdo{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{ ...styles.thTd, background: "#5590e740" }}
                >
                  <span
                    style={{
                      fontFamily: "Arial, sans-serif",
                      display: "block",
                      fontSize: "14px",
                      textAlign:'center'
                      
                    }}
                  >
                    Docentes participantes
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  style={{
                    ...styles.thTd,
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    {/* Firma 1 */}
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          borderTop: "1px solid black",
                          width: "150px",
                          margin: "30px",
                          marginBottom: "10px",
                        }}
                      ></div>

                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          Rector
                        </p>{" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {`${piarget.grado?.profesor.primer_nombre} ${
                            piarget.grado?.profesor.segundo_nombre || ""
                          } ${piarget.grado?.profesor.primer_apellido} ${
                            piarget.grado?.profesor.segundo_apellido
                          }`.trim()}
                        </p>
                      </div>
                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          C.C {piarget.grado?.profesor.documento}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          borderTop: "1px solid black",
                          width: "150px",
                          margin: "30px",
                          marginBottom: "10px",
                        }}
                      ></div>

                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          Profesor Director
                        </p>{" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {`${piarget.grado?.profesor.primer_nombre} ${
                            piarget.grado?.profesor.segundo_nombre || ""
                          } ${piarget.grado?.profesor.primer_apellido} ${
                            piarget.grado?.profesor.segundo_apellido
                          }`.trim()}
                        </p>
                      </div>
                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          C.C {piarget.grado?.profesor.documento}
                        </p>
                      </div>
                    </div>

                    {/* Firma 2 */}
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          borderTop: "1px solid black",
                          width: "150px",
                          margin: "30px",
                          marginBottom: "10px",
                        }}
                      ></div>

                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          Docente de Apoyo
                        </p>{" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {`${piarget.grado?.docenteapoyo.primer_nombre} ${
                            piarget.grado?.docenteapoyo.segundo_nombre || ""
                          } ${piarget.grado?.docenteapoyo.primer_apellido} ${
                            piarget.grado?.docenteapoyo.segundo_apellido
                          }`.trim()}
                        </p>
                      </div>
                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          C.C {piarget.grado?.docenteapoyo.documento}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td
                  colSpan="6"
                  style={{
                    ...styles.thTd,
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    {/* Firma 1 */}
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          borderTop: "1px solid black",
                          width: "150px",
                          marginTop: "5px",
                          marginBottom: "10px",
                        }}
                      ></div>

                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          Estudiante
                        </p>{" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {`${piarget.estudiante?.primer_nombre} ${
                            piarget.estudiante?.segundo_nombre || ""
                          } ${piarget.estudiante?.primer_apellido} ${
                            piarget.estudiante?.segundo_apellido
                          }`.trim()}
                        </p>
                      </div>
                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          {piarget.estudiante?.tipo_documento} {piarget.grado?.profesor.documento}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          borderTop: "1px solid black",
                          width: "150px",
                          margin: "5px",
                          marginBottom: "10px",
                        }}
                      ></div>

                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          Acudiente
                        </p>{" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {`${piarget.estudiante?.acudiente} 
                          `.trim()}
                        </p>
                      </div>
                 
                    </div>

                    {/* Firma 2 */}
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          borderTop: "1px solid black",
                          width: "150px",
                          margin: "0 auto",
                          marginBottom: "10px",
                        }}
                      ></div>

                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          Docente Orientadora
                        </p>{" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {`${piarget.grado?.docenteorienta.primer_nombre} ${
                            piarget.grado?.docenteorienta.segundo_nombre || ""
                          } ${piarget.grado?.docenteorienta.primer_apellido} ${
                            piarget.grado?.docenteorienta.segundo_apellido
                          }`.trim()}
                        </p>
                      </div>
                      <div>
                        {" "}
                        <p
                          style={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            margin: "0",
                          }}
                        >
                          {" "}
                          C.C {piarget.grado?.docenteorienta.documento}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td
                  colSpan="6"
                  style={{
                    ...styles.thTd,
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                    }}
                  >
                    {piarget.grado?.docente_materia.map((item, index) => {
                      const profesor = item.profesor;
                      return (
                        <div
                          key={index}
                          style={{ textAlign: "center", margin: "30px" }}
                        >
                          <div
                            style={{
                              borderTop: "1px solid black",
                              width: "150px",
                              margin: "0 auto",
                              marginBottom: "10px",
                            }}
                          ></div>
                          <div>
                            <p
                              style={{
                                fontFamily: "Arial, sans-serif",
                                display: "block",
                                fontSize: "12px",
                                margin: "0px",
                              }}
                            >
                              Profesor
                            </p>{" "}
                            <p
                              style={{
                                fontFamily: "Arial, sans-serif",
                                display: "block",
                                fontSize: "12px",
                                margin: "0px",
                              }}
                            >
                              {profesor.primer_nombre} {profesor.segundo_nombre}{" "}
                              {profesor.primer_apellido}{" "}
                              {profesor.segundo_apellido}
                            </p>
                            <p
                              style={{
                                fontFamily: "Arial, sans-serif",
                                display: "block",
                                fontSize: "12px",
                              }}
                            >
                              C.C {profesor.documento}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pdf_piear;
