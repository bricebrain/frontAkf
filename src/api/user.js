import axios from "axios";
import { urlApi } from "./config";

// export const allAcrticles = async () => await axios.get(`${urlApi}/articles/`);

export const createAccount = async (newInfo) =>
  await axios.post(`${urlApi}/createAccount/`, newInfo);

export const tryToConnect = async (newInfo) =>
  await axios.post(`${urlApi}/tryToConnect/`, newInfo);

export const updateClientFav = async (id, tabFav) =>
  await axios.put(`${urlApi}/updateClientFav/${id}`, tabFav);

// export const updateArticle = async (id, newInfo) =>
//   await axios.put(`${urlApi}/updateArticle/${id}`, newInfo);

// export const deleteArticle = async (id) =>
//   await axios.put(`${urlApi}/delete/${id}`, { status: "DEACTIVATED" });

// export const uploadFile = async (formData) =>
//   await axios.post(`${urlApi}/uploadfilesMulti/`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     withCredentials: true,
//   });
