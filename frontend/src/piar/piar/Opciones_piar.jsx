import React from "react";
import Contexto_general from "./Contexto_general";
import Valoracionpedagogica from "./Valoracionpedagogica";
import Objetivos from "./Objetivos";
import Rasonables from "./Rasonables";

function Opciones_piar({ data ,formData}) {
  console.log("holalll "+ data.id);
  return (
    <div>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {/* Item 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              b)	Contexto general del/a estudiante
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <Contexto_general data={data}/>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
            c)	Valoración pedagógica del/a estudiante
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
             <Valoracionpedagogica  data={data}/>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              d)	Objetivos y metas de aprendizaje
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
            <Objetivos  data={data} formData={formData}/>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThreee">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThreee"
              aria-expanded="false"
              aria-controls="flush-collapseThreee"
            >
             e)	Ajustes razonables y apoyos pedagógicos 
            </button>
          </h2>
          <div
            id="flush-collapseThreee"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThreee"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
            <Rasonables  data={data} formData={formData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opciones_piar;
