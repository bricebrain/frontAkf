/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import { ReactComponent as Add_Photo } from "../assets/add_photo.svg";
import Slider from "../components/Slider";
import axios from "axios";
import Dropzone from "react-dropzone";

const Add = () => {
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    price: 0,
    isBestsellers: false,
    category: "",
    description: "",
    status: "ACTIVE",
    quantity: 20,
    photos: [],
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    // Mettre à jour l'état des fichiers sélectionnés
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleRemoveFile = (index) => {
    // Supprimer un fichier de la liste
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let value = e.target.value;
    if (id == "price") {
      value = parseInt(value);
    }
    if (id == "isBestsellers") {
      value = value == "true" ? true : false;
    }

    console.log({ value, id });
    const newInfo = { ...info };
    newInfo[id] = value;
    setInfo(newInfo);
  };

  const handleUpload = async (e) => {
    // e.preventDefault();
    console.log({ info });

    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const response = await axios.post(
        "https://backendakf-production.up.railway.app/uploadfilesMulti/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const newInfo = { ...info };
      newInfo["photos"] = response.data.urls;

      const responseDB = await axios.post(
        "https://backendakf-production.up.railway.app/addArticles/",
        newInfo
      );

      console.log({ response, responseDB });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  function generateBlobUrl(blob) {
    return URL.createObjectURL(blob);
  }

  console.log(selectedFiles);
  return (
    <Layout>
      <div>
        {selectedFiles.map((blob, index) => (
          <div key={index}>
            <img src={generateBlobUrl(blob)} alt={`Blob ${index}`} />
          </div>
        ))}
      </div>

      <Dropzone
        onDrop={(acceptedFiles) => {
          let n = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          );

          setSelectedFiles((prevstate) => [...prevstate, ...n]);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              <Add_Photo>
                Drag 'n' drop some files here, or click to select files
              </Add_Photo>
            </div>
          </section>
        )}
      </Dropzone>
    </Layout>
  );
};

export default Add;
