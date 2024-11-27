import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";
import { Listar_personas ,Buscar_persona_id} from "../../../services/service_piar";
import { toast } from "react-toastify";

function Personas() {
  const navigate = useNavigate();
  const [paginationInfo, setPaginationInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [documento, setDocumento] = useState("");
  const [personas, setpersonas] = useState([]);

  const navigatenuevapersona = () => {
    navigate(`/dashboard/personas/create`);
  };
  const navigateeditar = (id) => {
    navigate(`/dashboard/personas/editar/${id}`);
  };


  

  const fetchData = async () => {
    try {
      let response;
      if (documento !==""){
         response = await Buscar_persona_id(currentPage,documento);
      }else{
         response = await Listar_personas(currentPage);
      }
    
      console.log("🚀 ~ fetchData ~ response:", response)
      

      setpersonas(response.data.results);
      setPaginationInfo(response.data);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
      toast.error("error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      if (error.response.statusText === "Unauthorized") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (documento === "") {
      fetchData();
    }
  }, [documento]);

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "rgba(249, 250, 251, 1)",
        textTransform: "uppercase",
        color: "rgba(107, 114, 128, 1))",
        fontSize: "0.70rem",
        textAlign: "center",
        fontWeight: "bold",
        lineHeight: "1rem",
      },
    },
    cells: {
      style: {
        fontSize: "0.76rem",
        textAlign: "center",
      },
    },
  };

  const columns = [
    {
      name: "#", // Columna para el número de fila
      cell: (row, index) => {
        const rowIndex = (currentPage - 1) * 20 + (index + 1); // 20 es el número de filas por página
        return <span>{rowIndex}</span>;
      },
      width: "50px", // Ajusta el ancho si es necesario
    },

    {
      name: "Tipo Documneto",
      selector: (row) => row.tipo_documento,
      width: "130px",
      cell: (row) => <div>{row.tipo_documento}</div>,
    },

    {
      name: "Documento",
      selector: (row) => row.documento,
      width: "130px",
      cell: (row) => <div>{row.documento}</div>,
    },
    {
      name: "Primer Nombre",
      selector: (row) => row.primer_nombre,
      width: "150px",
      cell: (row) => <div>{row.primer_nombre}</div>,
    },
    {
      name: "Segundo Nombre",
      selector: (row) => row.segundo_nombre,
      width: "170px",
      cell: (row) => <div>{row.segundo_nombre}</div>,
    },
    {
      name: "Primer Apellido",
      selector: (row) => row.primer_nombre,
      width: "150px",
      cell: (row) => <div>{row.primer_nombre}</div>,
    },
    {
      name: "Segundo Apellido",
      selector: (row) => row.segundo_apellido,
      width: "170px",
      cell: (row) => <div>{row.segundo_apellido}</div>,
    },

    {
      name: "Fecha de Nacimiento",
      selector: (row) => row.fecha_nacimiento,
      width: "180px",
      cell: (row) => <div>{row.fecha_nacimiento}</div>,
    },
    {
      name: "Sexo",
      selector: (row) => row.sexo,
      width: "130px",
      cell: (row) => <div>{row.sexo}</div>,
    },
    {
      name: "Telefono",
      selector: (row) => row.telefono,
      width: "130px",
      cell: (row) => <div>{row.telefono}</div>,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      width: "130px",
      cell: (row) => <div>{row.correo}</div>,
    },
    {
      name: "rol",
      selector: (row) => row.rol,
      width: "130px",
      cell: (row) => <div>{row.rol}</div>,
    },

    {
      name: "ACCIÓN",
      width: "140px",
      cell: (row) => (
        <>
          <button
            className="btn text-primary"
            style={{ height: "40px" }}
            onClick={() => navigateeditar(row.id)}
          >
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
          </button>
          {/*<button
            className="btn text-danger"
            style={{ height: "40px" }}
            onClick={abrirModal}
          >
            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
          </button>
          */}
        </>
      ),
    },
  ];

  const handleChange = (event) => {
    const value = event.target.value;
    setDocumento(value);
  };

  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };



  return (
    <div className="row">
      <div className="col-12 mt-3 mb-4">
        <h4 className="text-center"> Lista de Personas </h4>
        <div className="col-12 d-flex justify-content-between">
          <button className="btn btn-success" onClick={navigatenuevapersona} title="Agragar nueva persona">
            <FontAwesomeIcon icon="fa-solid fa-plus" /> Nuevo
          </button>
        </div>
      </div>

      <div className="col-12 mt-2 mb-4">
        <div className="col-12 d-flex justify-content-end">
          <div className="col-sm-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por número de documento"
              value={documento}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <DataTable
          columns={columns}
          data={personas}
          dense
          customStyles={customStyles}
          pagination
          paginationServer
          paginationPerPage={20}
          paginationTotalRows={paginationInfo.count || 0}
          onChangePage={handlePageChange}
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </div>
  );
}

export default Personas;
