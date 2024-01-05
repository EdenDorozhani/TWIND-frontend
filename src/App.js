import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { axiosConfigurations } from "./axiosConfig";
import React from "react";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    axiosConfigurations(navigate);
  }, [navigate]);

  return <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />;
}

export default App;
