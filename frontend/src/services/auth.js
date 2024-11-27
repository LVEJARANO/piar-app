import Service from "./baseService";

const resource = "rest/v1";

export function login(credentials) {
  return Service.post(`${resource}/token/`, credentials);
}

export function logout() {
  localStorage.clear();
}

export function setAccessToken(access_token) {
  localStorage.setItem("access", access_token);
}
export function setAccessCatalogo(catalogo) {
  localStorage.setItem("catalogo", catalogo);
}

export function setMunicipio(municipios) {
  localStorage.setItem("municipios", municipios);
}


export function setdatauser(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

export function setAccessrefresh(access_refresh) {
  localStorage.setItem("refresh", access_refresh);
}

export function getAccessToken() {
  return localStorage.getItem("access") || null;
}


export function authUser() {
  return Service.get(`${resource}/authenticated-user`);
}

export function verificar_sesion() {
  return Service.get(`${resource}/verificar_sesion`);
}

