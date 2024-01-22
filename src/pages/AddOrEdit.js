import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Formulaire from "../components/Formulaire";
import Validation from "../components/Validation";

const AddOrEdit = () => {
  let { state } = useLocation();

  const [processDone, setProcessDone] = useState(null);
  return (
    <Layout>
      {processDone ? (
        <Validation
          to={processDone.redirect ?? "/"}
          message1={processDone.text}
          height="90%"
        />
      ) : (
        <Formulaire
          setProcessDone={setProcessDone}
          data={state && state.data}
        />
      )}
    </Layout>
  );
};

export default AddOrEdit;
