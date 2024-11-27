import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../piar/user/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import Principal from "../home/Principal";
import Home from "../home/Home";
import Personas from "../piar/user/personas/Personas";
import Persona_form from "../piar/user/personas/Persona_form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Matricula from "../piar/matricula/matricula";
import Anual from "../piar/matricula/Anual";
import Grados from "../piar/matricula/Grados";
import Grado_form from "../piar/matricula/Grado_form";
import Sede_piar from "../piar/piar/Sede_piar";
import Anual_piar from "../piar/piar/Anual_piar";
import Grados_piar from "../piar/piar/Grados_piar";
import LIsta_Estudiantes from "../piar/piar/LIsta_Estudiantes";
import Piar from "../piar/piar/Piar";
import Piar_form from "../piar/piar/Piar_form";
import Pdf_piear from "../piar/piar/Pdf_piear";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Principal />}>
            <Route index path="home" element={<Home />} />
            <Route path="personas" element={<Personas />} />
            <Route path="personas/create" element={<Persona_form />} />
            <Route path="personas/editar/:id" element={<Persona_form />} />
            <Route path="matricula" element={<Matricula />} />
            <Route path="matricula-anual/:idsede" element={<Anual />} />
            <Route
              path="matricula-grado/:idsede/:idanual"
              element={<Grados />}
            />
            <Route
              path="matricula-grado-form/:idsede/:idanual"
              element={<Grado_form />}
            />
            <Route
              path="matricula-grado-form-editar/:idsede/:idanual/:id"
              element={<Grado_form />}
            />

            <Route path="sede-piar" element={<Sede_piar />} />
            <Route
              path="piar-form/:idsede/:idanual/:idgrado/:idestu"
              element={<Piar_form />}
            />
            <Route path="anual-piar/:idsede" element={<Anual_piar />} />

            <Route
              path="grados-piar/:idsede/:idanual"
              element={<Grados_piar />}
            />
            <Route
              path="estudiantes-piar/:idsede/:idanual/:idgrado"
              element={<LIsta_Estudiantes />}
            />
            <Route
              path="estudiantes-piar/:idsede/:idanual/:idgrado"
              element={<LIsta_Estudiantes />}
            />
            <Route
              path="piar/:idsede/:idanual/:idgrado/:idestu"
              element={<Piar />}
            />

            <Route
              path="pdf-piar/:idsede/:idanual/:idgrado/:idestu/:idpiar"
              element={<Pdf_piear />}
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default Rutas;
