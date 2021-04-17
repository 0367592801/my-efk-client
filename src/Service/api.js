import axios from "axios";
import { apiUrl } from "../const/apiUrl";
import Swal from "sweetalert2";
//login
export function loginAccount(data) {
  return axios.post(`${apiUrl}/auth/local`, data);
}

//register
export function registerAccount(data) {
  return axios.post(`${apiUrl}/auth/local/register`, data).catch((error) => {
    if (error.response.data.message[0]) {
      console.log(error.response.data.message[0]);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username or email already taken",
      });
    }
    return;
  });
}

//get Season
export function getAllSeason() {
  return axios.get(`${apiUrl}/seasons`);
}

//get Season
export function getSeason(id) {
  return axios.get(`${apiUrl}/seasons/${id}`);
}

//get lesson detail
export function getDetailLesson(id) {
  return axios.get(`${apiUrl}/lessons/${id}`);
}

//get PageDetail
export function getPage(id) {
  return axios.get(`${apiUrl}/pages/${id}`);
}

// get all 3d Model
export function getAll3DModel() {
  return axios.get(`${apiUrl}/model-3-ds`);
}
