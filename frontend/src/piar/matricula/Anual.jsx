import React, { useEffect, useState } from "react";
import { Anuales } from "../../services/service_piar";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

function Anual() {
    const navigate = useNavigate();
  const [anios, setanio] = useState([]);
  const {idsede} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Anuales();
        console.log("🚀 ~ fetchData ~ response:", response);
        setanio(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.statusText === "Unauthorized") {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);

  const navigategrado = (idgrado) => {
    navigate(`/dashboard/matricula-grado/${idsede}/${idgrado}`);
  };

  return (
    <div className="col-12">
      <h4 className="text-center mt-5"> Años</h4>
      <div className="row">
        <div className="d-flex flex-wrap justify-content-around">
          {anios.map((item, index) => (
            <h2 className="mt-5" key={index}>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigategrado(item.id)}
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  {item.descripcion}
                </Button>
              </div>
            </h2>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Anual;
