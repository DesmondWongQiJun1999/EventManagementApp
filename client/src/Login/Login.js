import React from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="body">
      <form className="form">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/User");
          }}
        >
          Log in as User
        </Button>

        <Button
          variant="contained"
          style={{ marginTop: "60px" }}
          onClick={() => {
            navigate("/Admin");
          }}
        >
          Log in as Admin
        </Button>
      </form>
    </div>
  );
};

export default Login;
