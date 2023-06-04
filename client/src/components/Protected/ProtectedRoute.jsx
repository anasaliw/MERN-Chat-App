import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  let loginCheck = localStorage.getItem("token");
  useEffect(() => {
    if (!loginCheck) {
      navigate("/");
    }
  }, [loginCheck]);

  return (
    <>
      <Layout />
      <Component />
    </>
  );
};

export default ProtectedRoute;
