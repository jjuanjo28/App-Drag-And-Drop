import React, { useState } from 'react'
import data from "../data/data.js"
import { useNavigate } from 'react-router-dom'
import useStore from '../stores/index.js'

export default function CreateUser({setUser, setLoged}) {
    const navigate = useNavigate()
   
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    function createUser(e) {
     
      e.preventDefault()
      const name = userName
      const mail = email
      const pass = password

      const newUser = {    
        id:data.length+1,
        user: name,
        email: mail,
        password: pass,
        tasks: [ ]
      }
    
      const test = data.filter((data)=> data.user == userName || data.email == email)
       if(test.length != 0){
         if(test[0].user == name) alert("El nombre de usuario ya está utilizado")
         if(test[0].email == mail) alert("El email que ingreso, ya esta cargado")
         console.log("test.user", test)
        } else {
        setUser(newUser)
        setLoged(true)
        navigate("/login")
      
      }
   
   
       

    
    
 }

  return (
    <div>
      <form onSubmit={createUser}>
     <label>
        Name:
        <input
            id='Name'
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
            type='text'
        />
     </label>
     <label>
        Email:
        <input
            id='email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            type='text'
        />
     </label>
     <label>
        password:
        <input
            id='Name'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type='password'
        />
     </label>
      <button onSubmit={createUser}>Create User</button>
       </form>
    </div>
  )
}
