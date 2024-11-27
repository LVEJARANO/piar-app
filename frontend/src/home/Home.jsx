import React from 'react'
import logo from '../assets/img/logo_piar.png'

function Home() {
  return (
    <div>
    <div className="text-center">
      <img
        src={logo}
        alt="Imagen de inicio"
        style={{ width: "30%", maxWidth: "30%" }}
      />
    </div>
    <div className="text-center  mt-3 mb-5">
      <h5 className="mb-5">
      RESEÑA HISTORICA DE LA INSTITUCION EDUCATIVA RAFAEL POMBO

RESEÑA HISTORICA: La Institución Educativa Rafael Pombo fue en sus inicios fundada en 1939 como escuela pública, según ordenanza No 46 de junio 15 del mismo año; por medio de la cual se determinaron las escuelas del Departamento del Cauca: designándose Escuela de Varones Rafael Pombo con un director y tres subdirectores <br /> 
      </h5>
    </div>
  </div>
  )
}

export default Home