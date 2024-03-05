import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonRed } from './Botones'
import mainStore from "../stores/index.js"
export default function Nav({setLoged, logged}) {
  const { logOut } = mainStore()
   useEffect(() => {
   navigate("/")
   }, [logged])
   const salir = () =>{
    logOut()
    setLoged(false)
   }

    const navigate = useNavigate()
  return (
    <div style={{backgroundColor:"blue"}}>
     <button onClick={()=> navigate("/login")}>Login</button>
     <button onClick={salir}>Logout</button>
     {logged? (<ButtonRed onClick={()=> navigate("/tasklist")} text={"Task List"}/>):null}
     {logged? (<button onClick={()=> navigate("/")}>Home</button>):null}
     </div>
  )
}
