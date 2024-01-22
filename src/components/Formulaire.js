import { useState, useEffect } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { Link, useLocation } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Slider from "./Slider";
import MediaCard from "./Card";
import Camera from "./Camera";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dropzone from "react-dropzone";
import { addArticle, updateArticle, uploadFile } from "../api/articles";

const categories = [
  {
    value: "BAG",
    label: "Sacs",
  },
  {
    value: "CLOTHING",
    label: "Prêt à porter",
  },
  {
    value: "CARE",
    label: "Soins du corps",
  },
  {
    value: "BEAUTY_AND_ACCESORIES",
    label: "Maquillage & Accesoires",
  },
];

const isSuggestions = [
  {
    value: true,
    label: "Oui",
  },
  {
    value: false,
    label: "Non",
  },
];

const Space = ({ height }) => {
  return <div style={{ height: height ?? 9 }} />;
};

export default function Formulaire({ setProcessDone }) {
  let { state } = useLocation();

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

  useEffect(() => {
    if (state) {
      let obj = state.data;

      delete obj["color"];
      delete obj["color"];
      delete obj["created"];
      delete obj["updated"];

      setInfo(obj);
      setSelectedFiles(obj.picture);
      console.log(state.data);
    }

    return () => {};
  }, []);

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

  const submit = async (e) => {
    // e.preventDefault();
    console.log({ info });

    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const response = await uploadFile(formData);

      const newInfo = { ...info };
      newInfo["picture"] = response.data.urls;

      const responseDB = await addArticle(newInfo);
      setProcessDone({ text: "L'article a été ajouté en base de données" });
      console.log({ response, responseDB });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const update = async (e) => {
    // e.preventDefault();
    const newInfo = { ...info };
    const id = newInfo.id;

    delete newInfo["id"];

    try {
      const formData = new FormData();

      const oldFile = selectedFiles.filter((item) => !item.path);
      const newFile = selectedFiles.filter((item) => item.path);
      console.log({ oldFile });

      if (newFile.length > 0) {
        newFile.forEach((file, index) => {
          formData.append(`files`, file);
        });
        const response = await uploadFile(formData);
        newInfo["picture"] = [...oldFile, ...response.data.urls];
      } else {
        newInfo["picture"] = oldFile;
      }

      await updateArticle(id, newInfo);
      setProcessDone({
        text: "L'article a été mis à jour",
        redirect: "/Products",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const suppression = async (e) => {
    // e.preventDefault();
    const newInfo = { ...info };
    const id = newInfo.id;

    delete newInfo["id"];

    try {
      newInfo["status"] = "DELETE";
      await updateArticle(id, newInfo);
      setProcessDone({
        text: "L'article a été supprimé",
        redirect: "/Products",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  // updateArticle

  console.log(info);
  return (
    <form noValidate autoComplete="off">
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

              <Camera />
            </div>
          </section>
        )}
      </Dropzone>

      <Slider>
        <div className="slider-list">
          {selectedFiles.map((item) => (
            <MediaCard
              item={item}
              cancel={() =>
                setSelectedFiles((prevState) =>
                  prevState.filter(
                    (prevItem) =>
                      prevItem.path !== item.path || prevItem == item
                  )
                )
              }
            />
          ))}
        </div>
      </Slider>
      <FormControl sx={{ width: "100%", padding: 1 }}>
        <TextField
          required
          id="outlined-required"
          label="Marque"
          defaultValue={info.brand}
          value={info.brand}
          onChange={(e) => {
            setInfo((prevState) => {
              return { ...prevState, brand: e.target.value };
            });
          }}
        />

        <Space height={20} />

        <TextField
          multiline
          minRows={2}
          required
          id="outlined-required"
          label="Description"
          defaultValue={info.description}
          value={info.description}
          onChange={(e) => {
            setInfo((prevState) => {
              return { ...prevState, description: e.target.value };
            });
          }}
          // value={info.brand}
        />
        {/* <Space height={20} /> */}

        {/* <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        /> */}
        <Space height={20} />

        <TextField
          id="outlined-select-currency"
          select
          label="Categories"
          defaultValue={info.category}
          value={info.category}
          onChange={(e) => {
            setInfo((prevState) => {
              return { ...prevState, category: e.target.value };
            });
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Space height={20} />

        <TextField
          id="outlined-select-currency"
          select
          label="Afficher dans suggestions"
          defaultValue={info.isBestseller}
          value={info.isBestseller}
          onChange={(e) => {
            setInfo((prevState) => {
              return { ...prevState, isBestseller: e.target.value };
            });
          }}
        >
          {isSuggestions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Space height={20} />
        <TextField
          id="outlined-number"
          label="Stock"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={info.stock}
          defaultValue={info.stock}
          onChange={(e) => {
            setInfo((prevState) => {
              return { ...prevState, stock: e.target.value };
            });
          }}
        />
        <Space height={20} />
        <TextField
          id="outlined-number"
          label="Prix"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={info.price}
          defaultValue={info.price}
          onChange={(e) => {
            setInfo((prevState) => {
              return { ...prevState, price: e.target.value };
            });
          }}
        />
        <Space height={20} />
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"center"}
          paddingTop={1}
        >
          {state && state.data.id && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => suppression()}
            >
              Supprimer
            </Button>
          )}

          <Button
            disabled={!isValidate(info)}
            variant="contained"
            color="success"
            onClick={() => {
              if (state && state.data.id) {
                update();
              } else {
                submit();
              }
            }}
          >
            Sauvegarder
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
}
