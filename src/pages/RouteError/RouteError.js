import React from "react";
import image from "../../assets/404-error-with-landscape-concept-illustration_114360-7888.avif";
import TextButton from "../../lib/components/TextButton";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const navigateTo = () => {
    const session = localStorage.getItem("session");
    if (!session) {
      navigate("/");
    } else {
      navigate("/twind");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgb(9, 121, 84)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        gap: "30px",
      }}
    >
      <h1 style={{ fontSize: "2em" }}>Oops! Something went wrong...</h1>
      <img src={image} alt="Error Illustration" style={{ height: "300px" }} />
      <TextButton
        content={"Back to main page"}
        color={"white"}
        action={navigateTo}
      />
    </div>
  );
};

export default ErrorPage;
