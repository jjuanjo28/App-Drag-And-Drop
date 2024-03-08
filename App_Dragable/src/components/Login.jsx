import React, { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import mainStore from "../stores/index.js"
import axios from "axios"
import Cookies from "universal-cookie"
import "./Login.css"
export default function Login({setUser, setLoged, setIdNumber}) {
  const {setUserZustand} = mainStore()
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [usuario, setUsuario] = useState("")
 
  useEffect(() => {
    if(usuario != "") {
      // que pasa aca??????????
      console.log(usuarioID)
      
   
  }

  }, [usuario])


  const captureUser = async (dataLogin) =>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/users/auth/login/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(dataLogin)
    };
    
    axios.request(config)
    .then((response) => {
      const newdata = response.data
      console.log("soy el newData en la resp capture user:",newdata)
      setIdNumber(newdata.idUser)
      setLoged(true)
      const cookies = new Cookies
      cookies.set("idToken", `${newdata.token}`)

      
    })
    .catch((error) => {
      console.log(error);
    });
    
    console.log(usuario)
  }
  const getUser = async (usuario) => {
   captureUser(usuario)
}
  
  const getUsuario = () => {
 
     
      const  name = userName
      const pass = password
      getUser({name:name,password:pass})
      navigate("/")
  
  
     
     
  }

  return (
    <div className='container'>
    
     <form onSubmit={getUsuario} className='form'>
     <div className='interno'>

     <label className='label'>
         User:
        <input
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
            type='text'
            className="form__input"
        />
     </label>
     </div>
     <div className='interno'>

     <label className='label'>
        password:
        <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            className="form__input"
        />
     </label>
     </div>
     <button onSubmit={getUsuario} className="form__button">Login User</button>

     </form>
     </div>
   
  )
}