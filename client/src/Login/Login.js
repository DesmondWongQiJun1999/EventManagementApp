import React, { useState } from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "http://localhost:5000/";
  const loginFunc = async () => {
    const response = await fetch(API_URL + "api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    if (result === "admin"){
      navigate("/Admin");
    } else if (result === "user"){
      navigate("/User");
    }
  };

  return (
    <div className="body">
      <form className="form">
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Email"
          label="Email"
          value={email}
          fullWidth
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          variant="standard"
        />

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="Password"
          label="Password"
          fullWidth
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ marginTop: "30px" }}
        />

        <Button
          variant="contained"
          style={{ marginTop: "30px" }}
          onClick={() => {
            loginFunc();
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
