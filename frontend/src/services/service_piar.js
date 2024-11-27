import Service from "./baseService";

const resource = "rest/v1";

export function Crearpersona(formData) {
  return Service.post(`${resource}/personas/`, formData);
}

export function Persona_id(id) {
  return Service.get(`${resource}/personas/${id}/`);
}

export function Listar_personas(currentPage) {
  const limit = 20;
  const offset = (currentPage - 1) * limit;
  return Service.get(`${resource}/personas/?&limit=${limit}&offset=${offset}`);
}

export function Buscar_persona_id(currentPage,id) {
  const limit = 20;
  const offset = (currentPage - 1) * limit;
  return Service.get(`${resource}/personasbuscar/${id}/?&limit=${limit}&offset=${offset}`);
}

export function Editarpersona(id, formData) {
  return Service.put(`${resource}/personas/${id}/`, formData);
}

export function Buscarpersona(id) {
  return Service.get(`${resource}/personas/${id}/`);
}

export function Anuales() {
  return Service.get(`${resource}/anual/`);
}

export function PersonasSelect(rol) {
  return Service.get(`${resource}/selectpersonas/?rol=${rol}`);
}

export function Lista_materias() {
  return Service.get(`${resource}/materias/`);
}

export function Post_matricula(formData) {
  return Service.post(`${resource}/grados/`, formData);
}

export function Lista_Grados(anual, sede) {
  return Service.get(`${resource}/list_grados/?anual=${anual}&sede=${sede}`);
}
export function Buscargrados_id(id) {
  return Service.get(`${resource}/grados/${id}/`);
}

export function Put_grados(id, formData) {
  return Service.put(`${resource}/grados/${id}/`, formData);
}

export function Lista_Grados_estudiantes(idanual, idsede, idgrado) {
  return Service.get(
    `${resource}/estudiantes_filtrados/?anual=${idanual}&sede=${idsede}&id=${idgrado}`
  );
}

export function Post_diagnistico(formData) {
  return Service.post(`${resource}/diagnosticos/`, formData);
}
export function Lista_diagnostico_persona(idpersona) {
  return Service.get(`${resource}/diagnosticos_persona/?persona=${idpersona}`);
}

export function Post_piar(formData) {
  return Service.post(`${resource}/piar/`, formData);
}

export function piars_id(id) {
  return Service.get(`${resource}/piars/${id}/`);
}

export function Put_piar(id, formData) {
  return Service.put(`${resource}/piars/${id}/`, formData);
}

export function Lista_piar(anual, sede, grado, estudiante) {
  return Service.get(
    `${resource}/piar/?anual=${anual}&sede=${sede}&grado=${grado}&estudiante=${estudiante}`
  );
}

export function Post_contextogenaral(formData) {
  return Service.post(`${resource}/contextogenaral/`, formData);
}

export function Lista_contexto(id) {
  return Service.get(`${resource}/contextogenaral_id/${id}/`);
}
export function contexto_id(id) {
  return Service.get(`${resource}/contextogenaralid/${id}/`);
}

export function Put_contexto(id, formData) {
  return Service.put(`${resource}/contextogenaralid/${id}/`, formData);
}

export function valoraciones_piar(id) {
  return Service.get(`${resource}/valoraciones_id/${id}/`);
}

export function Post_valoraciones(formData) {
  return Service.post(`${resource}/valoraciones/`, formData);
}
export function Put_valoraciones(id, formData) {
  return Service.put(`${resource}/valoraciones/${id}/`, formData);
}

export function Getvaloraciones(id) {
  return Service.get(`${resource}/valoraciones/${id}/`);
}

export function Materias_por_estudiante(estudiante, anual, grado, sede) {
  return Service.get(
    `${resource}/materias-por-estudiante/?estudiante_id=${estudiante}&anual_id=${anual}&grado_id=${grado}&sede_id=${sede}`
  );
}

export function Post_objetivos(formData) {
  return Service.post(`${resource}/objetivos/`, formData);
}
export function Getobjetivos(id) {
  return Service.get(`${resource}/objetivos/${id}/`);
}

export function Put_objetivos(id, formData) {
  return Service.put(`${resource}/objetivos/${id}/`, formData);
}

export function Get_por_piar_desde_objetivos(id) {
  return Service.get(`${resource}/por_piar_desde_objetivos/${id}/`);
}

export function Get_por_piar_desde_rasonables(id) {
  return Service.get(`${resource}/por_piar_desde_rasonables/${id}/`);
}

export function Post_razonables(formData) {
  return Service.post(`${resource}/razonables/`, formData);
}
export function Getrazonables(id) {
  return Service.get(`${resource}/razonables/${id}/`);
}

export function Put_razonables(id, formData) {
  return Service.put(`${resource}/razonables/${id}/`, formData);
}

export function Getpiarpdf(id) {
  return Service.get(
    `${resource}/piarpdf/?id=${id}`
  );
}

export function Diagnosticoid(id) {
  return Service.get(
    `${resource}/diagnosticoid/${id}/`
  );
}

export function Put_diagnostico(id, formData) {
  return Service.put(`${resource}/diagnostico/${id}/`, formData);
}

export function Updatesoporte(id, formData) {
  return Service.put(`${resource}/updatesoporte/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

