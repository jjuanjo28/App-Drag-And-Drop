import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "universal-cookie";
import "./Login.css";

export default function Login({ setLoged, setIdNumber }) {
 
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    if(usuario != ""){
      getUsuario(usuario)
    }
  
  }, [usuario])
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El user es obligatorio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: (formData) => {
      console.log("soy formData:", formData);
      setUsuario(formData)
    },
  });
  const captureUser = async (dataLogin) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users/auth/login/",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(dataLogin),
    };

    axios
      .request(config)
      .then((response) => {
        const newdata = response.data;
        console.log("soy el newData en la resp capture user:", newdata);
        setIdNumber(newdata.idUser);
        setLoged(true);
        const cookies = new Cookies();
        cookies.set("idToken", `${newdata.token}`);
      })
      .catch((error) => {
        if(error.response.data.messge == "User not found"){
          alert(error.response.data.messge);
          navigate("/createUser")
        } else {
          console.log(error)
        }
      });
   };

  const getUsuario = (user) => {
    captureUser({ name: user.name, password: user.password })
    navigate("/");
  };

  return (
    <Container
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <h1>Formulario de Login</h1>
      <Form style={{ width: "30%" }} onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="User"
          name="name"
          onChange={formik.handleChange}
          error= {formik.errors.name }
          value={formik.values.name}
        />
        <Form.Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          error= {formik.errors.password}
          value={formik.values.password}
        />
        <Button style={{ margin: "5px" }} type="submit">
          Login
        </Button>
        <Button onClick={formik.handleReset} style={{ margin: "5px" }} type="button">
          Clear Form
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => navigate("/createUser")}
        >
          "Create User"
        </Button>
      </Form>
    </Container>

  );
}
