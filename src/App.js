import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { axiosConfigurations } from "./axiosConfig";
import React from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    axiosConfigurations(navigate);
  }, [navigate]);

  return (
    <ToastContainer
      style={{ zIndex: 100000000 }}
      autoClose={3000}
      pauseOnFocusLoss={false}
    />
  );
}

export default App;
