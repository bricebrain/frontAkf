/* eslint-disable jsx-a11y/alt-text */
import "../App.css";
import Menu from "../assets/menu.svg";
import Search from "../assets/search.svg";
import Cart from "../assets/shopping_bag.svg";
import Person from "../assets/person.svg";
import Favorite from "../assets/favorite.svg";
import Location from "../assets/location.svg";

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

function Edit() {
  let { state } = useLocation();
  const [end, setEnd] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photoActual, setPhotoActual] = useState(state.data.picture);

  const [info, setInfo] = useState({});

  const isValidate = (data) => {
    console.log({ data });
    if (
      data.brand?.length > 0 &&
      data?.price > 1 &&
      data.category?.length > 0 &&
      data.description?.length > 0 &&
      (selectedFiles?.length > 0 || photoActual?.length > 0)
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    let ElementToEdit = {
      id: state.data.id,
      brand: state.data.brand,
      price: state.data.price,
      isBestseller: state.data.isBestseller,
      category: state.data.category,
      description: state.data.description,
      status: state.data.status,
      picture: state.data.picture,
      stock: 20,
    };

    setInfo(ElementToEdit);
    // setSelectedFiles(state.data.picture);
    // getArticles();
    return () => {};
  }, []);

  const ItemActual = (props) => {
    return (
      <div
        // className="slider-item"
        style={{
          width: "90vw",
          height: "10vh",
          margin: 10,
          marginTop: 0,
          padding: 10,
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

  const Item = (props) => {
    return (
      <div
        // className="slider-item"
        style={{
          width: "90vw",
          height: "12vh",
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
      const newInfo = { ...info };
      let response;
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          formData.append(`files`, file);
        });

        response = await axios.post(
          "http://127.0.0.1:8000/uploadfilesMulti/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        newInfo["picture"] = [...newInfo["picture"], ...response.data.urls];
      }

      const responseDB = await axios.put(
        `http://127.0.0.1:8000/updateArticle/${info.id}`,
        newInfo
      );
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setEnd({ type: "save" });
    }
  };

  const Remove = async (e) => {
    try {
      const responseDB = await axios.put(
        `http://127.0.0.1:8000/delete/${info.id}`,
        { status: "DEACTIVATED" }
      );
    } catch (error) {
      console.error("desactivation:", error);
    } finally {
      setEnd({ type: "remove" });
    }
  };

  console.log({ info });
  return !end ? (
    <Layout withoutFooter={true} headerName={"Article à modifier"}>
      {/* <Title name={"Modification d'article"} marginBottom={0} header /> */}
      <span style={{ margin: 0, marginLeft: 20 }}>Photo(s) actuelle(s)</span>
      <Slider>
        <ul className="slider-list" style={{ margin: 10 }}>
          {photoActual.map((picture, index) => (
            <ItemActual>
              {photoActual.length > 1 && (
                <span
                  style={{
                    backgroundColor: "black",
                    height: 20,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 10,
                    padding: 10,

                    opacity: 0.1,
                  }}
                >
                  {index + 1} / {photoActual.length}
                </span>
              )}
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
                  src={picture}
                  alt={`Blob ${1}`}
                  height={"60%"}
                  style={{ borderRadius: 10, objectFit: "contain" }}
                />
                <Cancel
                  fill="red"
                  height={20}
                  width={20}
                  onClick={() =>
                    setPhotoActual((prevState) =>
                      prevState.filter((urlItem) => urlItem !== picture)
                    )
                  }
                  style={{
                    marginTop: 5,
                  }}
                />
              </div>
            </ItemActual>
          ))}
        </ul>
      </Slider>

      <div
        style={{
          width: "90%",
          height: "3%",
          padding: 20,
          margin: 20,
          marginBottom: 0,
          marginTop: 0,
          paddingBottom: 0,
          paddingTop: 0,
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

                <Add_Photo style={{ height: 20, width: 20, marginTop: 5 }} />
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
          height: "58%",

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
            value={info?.brand}
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
            value={info?.description}
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
            value={info.price}
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
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <Save
              fill={isValidate(info) ? "green" : "lightgrey"}
              onClick={() => (isValidate(info) ? Submit() : {})}
              style={{ height: 26, width: 26 }}
            /> */}
            <button
              disabled={!isValidate(info)}
              style={{
                marginRight: 20,
                // paddingLeft: 10,
                // paddingRight: 10,
                // paddingBottom: 5,
                padding: 10,
                backgroundColor: isValidate(info) ? "green" : "lightgrey",
                color: "white",
                border: "none",
                display: "flex",
                alignItems: "center",
                borderRadius: 5,
              }}
              onClick={() => {
                Submit();
              }}
            >
              {" "}
              Sauvegarder
            </button>
            <button
              style={{
                marginRight: 20,
                // paddingLeft: 10,
                // paddingRight: 10,
                // paddingBottom: 5,
                padding: 10,
                backgroundColor: "red",
                color: "white",
                border: "none",
                display: "flex",
                alignItems: "center",
                borderRadius: 5,
              }}
              onClick={() => {
                Remove();
              }}
            >
              {" "}
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Validation
      to="/EditList"
      message1={
        end.type === "save"
          ? "L'article a été mis à jour"
          : "L'article a été supprimé dans la base de données"
      }
    />
  );
}

export default Edit;
