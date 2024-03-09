import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import mainStore from "../stores/index.js"
import "./Nav.css"
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
    <div className='navbar'>
     <button className='button-nav' onClick={()=> navigate("/login")}>Login</button>
     <button className='button-nav' onClick={salir}>Logout</button>
     {logged? (<button className='button-nav' onClick={()=> navigate("/tasklist")} >Task List</button>):null}
     {logged? (<button className='button-nav' onClick={()=> navigate("/")}>Home</button>):null}
     </div>
  )
}
