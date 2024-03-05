import React, { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import mainStore from "../stores/index.js"
import axios from "axios"
import Cookies from "universal-cookie"

export default function Login({setUser, setLoged, setIdNumber}) {
  const {setUserZustand} = mainStore()
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [usuario, setUsuario] = useState("")
 
  useEffect(() => {
    if(usuario != "") {
      console.log(usuarioID)
      
    //  getUser(usuario)
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
      // aca tengo que agregar!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     // setUserZustand(newdata)
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
      
    //  if(data.some((usuario)=> usuario.user == name )){
    //   const test = data.filter((data)=> data.user == name && data.password == pass)
    //   setUser(test)

        navigate("/")
  
  
    //  } else {
         
    //      alert("no existe su usuario!!!!")
    //  }
  
     
  }

  return (
    <div>
     <form onSubmit={getUsuario}>
     <label>
        User:
        <input
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
            type='text'
        />
     </label>
     <label>
        password:
        <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type='text'
        />
     </label>
     <button onSubmit={getUsuario}>Login User</button>

     </form>
      <button onClick={()=>console.log(usuario)}>ver el usuario</button>
    </div>
  )
}
