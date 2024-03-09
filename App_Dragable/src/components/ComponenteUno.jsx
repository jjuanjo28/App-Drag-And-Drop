import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ComponenteUno.css"
import useStore from "../stores/index.js";
import Task from "./task.jsx";
export default function ComponenteUno() {
    const navigate = useNavigate()
    const {deleteTask,tasksUser} = useStore((state)=>{
      return { tasksUser: state.tasksUser, deleteTask: state.deleteTask }
    })
  
  return (
    
     
      <div className="container" >
      <h1> Estoy en componente 1</h1>
      </div>
    
   
  )
}
