import axios from "axios";
import { urlApi } from "./config";

export const allArticles = async () => await axios.get(`${urlApi}/articles/`);

export const stockArticles = async () =>
  await axios.get(`${urlApi}/stockArticles/`);

export const addArticle = async (newInfo) =>
  await axios.post(`${urlApi}/addArticles/`, newInfo);

export const updateArticle = async (id, newInfo) =>
  await axios.put(`${urlApi}/updateArticle/${id}`, newInfo);

export const deleteArticle = async (id) =>
  await axios.put(`${urlApi}/delete/${id}`, { status: "DEACTIVATED" });

export const uploadFile = async (formData) =>
  await axios.post(`${urlApi}/uploadfilesMulti/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
