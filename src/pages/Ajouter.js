/* eslint-disable jsx-a11y/alt-text */
import "../App.css";

import { ReactComponent as Cancel } from "../assets/cancel.svg";
import { ReactComponent as Save } from "../assets/save.svg";

import Layout from "../components/Layout";
import Categories from "../components/Categories";
import { ReactComponent as Add_Photo } from "../assets/add_photo.svg";
import Slider from "../components/Slider";
import Title from "../components/Title";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import Validation from "../components/Validation";

function Article() {
  // let { state } = useLocation();
  const [end, setEnd] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [info, setInfo] = useState({
    brand: "",
    price: 0,
    isBestseller: false,
    category: "",
    description: "",
    status: "ACTIVE",
    picture: [],
    stock: 20,
  });

  const isValidate = (data) => {
    console.log({ data });
    if (
      data.brand.length > 0 &&
      data.price > 1 &&
      data.category.length > 0 &&
      data.description.length > 0 &&
      selectedFiles.length > 0
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    // getArticles();
    return () => {};
  }, []);

  const Item = (props) => {
    return (
      <div
        // className="slider-item"
        style={{
          width: "90vw",
          height: "15vh",
          margin: 10,

          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 25,
          backgroundColor: "white",
        }}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  };

  function generateBlobUrl(blob) {
    return URL.createObjectURL(blob);
  }

  const Submit = async (e) => {
    // e.preventDefault();
    console.log({ info });

    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const response = await axios.post(
        "http://127.0.0.1:8000/uploadfilesMulti/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const newInfo = { ...info };
      newInfo["picture"] = response.data.urls;

      const responseDB = await axios.post(
        "http://127.0.0.1:8000/addArticles/",
        newInfo
      );

      console.log({ response, responseDB });
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setEnd({ type: "add" });
    }
  };

  console.log({ info });
  return !end ? (
    <Layout withoutFooter={true} headerName="Nouvel article">
      <div
        style={{
          width: "90%",
          height: "5%",
          padding: 20,
          margin: 20,
          marginBottom: 0,
          marginTop: 0,
          backgroundColor: "white",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        Ajoutez photos
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

                <Add_Photo style={{ height: 30, width: 30 }} />
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      <Slider>
        <ul className="slider-list" style={{ margin: 10 }}>
          {selectedFiles.map((blob, index) => (
            <Item>
              <div
                style={{
                  // width: 100,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={generateBlobUrl(blob)}
                  alt={`Blob ${index}`}
                  height={"80%"}
                />

                <Cancel
                  fill="red"
                  onClick={() =>
                    setSelectedFiles((prevState) =>
                      prevState.filter((item) => item.path !== blob.path)
                    )
                  }
                  style={{
                    marginTop: 5,
                  }}
                />
              </div>
            </Item>
          ))}
        </ul>
      </Slider>

      <div
        style={{
          width: "90%",
          height: "65%",

          padding: 10,
          margin: 20,
          marginTop: 0,
          marginBottom: 0,
          backgroundColor: "white",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{}}>Marque</h1>
          <input
            onChange={(e) => {
              setInfo((prevState) => {
                return { ...prevState, brand: e.target.value };
              });
            }}
            style={{
              padding: 10,
              borderRadius: 5,
              border: "none",
              border: "1px solid grey",
              width: "90%",
              height: 25,
            }}
          ></input>

          <h1 style={{ marginBottom: 0 }}>Description</h1>

          <textarea
            id="description"
            onChange={(e) => {
              setInfo((prevState) => {
                return { ...prevState, description: e.target.value };
              });
            }}
            rows="8"
            cols="20"
            style={{
              height: 50,
              borderRadius: 5,
              padding: 10,
              border: "1px solid grey",
              width: "90%",
              marginBottom: 10,
            }}
          />

          <fieldset
            style={{
              borderRadius: 5,
              padding: 10,
              paddingLeft: 10,
              border: "1px solid grey",
              width: "90%",
              marginBottom: 10,
            }}
          >
            <legend>Categorie:</legend>

            {["Sac", "Robe", "Beaute"].map((item) => {
              return (
                <div>
                  <input
                    style={{ padding: 0 }}
                    id="category"
                    onChange={(e) => {
                      setInfo((prevState) => {
                        return { ...prevState, category: e.target.value };
                      });
                    }}
                    type="checkbox"
                    value={item}
                    checked={info.category === item ? true : false}
                  />
                  <label for={item}>{item}</label>
                </div>
              );
            })}
          </fieldset>

          <fieldset
            style={{
              borderRadius: 5,
              padding: 5,
              border: "1px solid grey",
              width: "90%",
            }}
          >
            <legend>Bestsellers:</legend>
            {[true, false].map((item) => {
              return (
                <div>
                  <input
                    style={{ padding: 0 }}
                    id="bestseller"
                    onChange={(e) => {
                      setInfo((prevState) => {
                        let value;
                        if (e.target.value === "true") value = true;
                        if (e.target.value === "false") value = false;

                        return { ...prevState, isBestseller: value };
                      });
                    }}
                    type="checkbox"
                    value={item}
                    checked={info.isBestseller === item ? true : false}
                  />
                  <label for={item === true ? "Oui" : "Non"}>
                    {item === true ? "Oui" : "Non"}
                  </label>
                </div>
              );
            })}
          </fieldset>

          <h1 style={{ marginBottom: 0, marginTop: 10 }}>Prix</h1>
          <input
            type="number"
            onChange={(e) => {
              setInfo((prevState) => {
                return { ...prevState, price: e.target.value };
              });
            }}
            style={{
              padding: 10,
              borderRadius: 5,
              border: "none",
              border: "1px solid grey",
              width: "90%",
              marginBottom: 10,
              height: 25,
            }}
          ></input>

          <div
            style={{
              padding: 10,
              margin: 20,
              marginBottom: 0,
              marginTop: 10,
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Save
              fill={isValidate(info) ? "green" : "lightgrey"}
              onClick={() => (isValidate(info) ? Submit() : {})}
              style={{ height: 36, width: 36 }}
            />
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Validation
      to="/admin"
      message1="L'article a été ajouté dans la base de données"
    />
  );
}

export default Article;
