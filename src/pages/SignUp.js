import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import Layout from "../components/Layout";

import SignUpComponent from "../components/signUpComponent";

export default function SignUp({}) {
  let { state } = useLocation();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout>
      <SignUpComponent />
    </Layout>
  );
}
