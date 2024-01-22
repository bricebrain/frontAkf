import axios from "axios";
import { urlApi } from "./config";

export const updateTheCommande = async (id, status) =>
  await axios.put(`${urlApi}/updateCommande/${id}?status=${status}`);

export const addCommande = async (newCommande) =>
  await axios.post(`${urlApi}/addCommande/`, newCommande);

export const allCommande = async () => await axios.get(`${urlApi}/commandes/`);

export const analyse = async () => await axios.get(`${urlApi}/analyse/`);
