import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "universal-cookie";

export default function CreateUser({ setLoged, setIdNumber}) {
    const navigate = useNavigate()
    
    const captureUser = async (dataLogin) => {
      console.log("soy data login:",dataLogin);
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
          console.log("soy el error:",error)
          if(error.response.data.messge == "User not found"){
            alert(error.response.data.messge);
            navigate("/createUser")
          } else {
            console.log(error)
          }
        });
     };
    function createUser(user) {
      
      let data = JSON.stringify({
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "type_user": "user"
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/users',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log("soy la response:",response)
        if(response.data.message == "Usuario Creado Correctamente"){
         captureUser({ name: user.name, password: user.password })
         navigate("/")
        } 
      })
      .catch((error) => {
        console.log(error);
        alert(JSON.stringify(error.response.data))
        formik.handleReset()
      });
    }

    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        repeatPassword:"",
        type_user:"2"
      },
      validationSchema: Yup.object({
        name: Yup.string().required("El user es obligatorio"),
        email: Yup.string().required("El email es obligatorio"),
        password: Yup.string().required("El password es obligatorio")
                  .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
        repeatPassword: Yup.string().required("El password es obligatorio"),
      }),
      onSubmit: (formData) => {
        console.log("soy formData:", formData);
        createUser(formData)
       },
    })


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
      <h1>Formulario de Registro</h1>
      <Form style={{ width: "30%" }} onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="UserName"
          name="name"
          onChange={formik.handleChange}
          error= {formik.errors.name }
          value={formik.values.name}
        />
           <Form.Input
          type="text"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          error= {formik.errors.email}
          value={formik.values.email}
        />
        <Form.Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          error= {formik.errors.password}
          value={formik.values.password}
        />
        <Form.Input
          type="password"
          placeholder="Repeat your Password"
          name="repeatPassword"
          onChange={formik.handleChange}
          error= {formik.errors.repeatPassword}
          value={formik.values.repeatPassword}
        />

        <Button style={{ margin: "5px" }} type="submit">
          Create User
        </Button>
        <Button onClick={formik.handleReset} style={{ margin: "5px" }} type="button">
          Clear Form
        </Button>
        <Button
          style={{ margin: "5px" }}
          onClick={() => navigate("/createUser")}
        >
          Login width Google 
        </Button>
      </Form>

    </Container>
  )
}
