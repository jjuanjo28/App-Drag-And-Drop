import React, { useState } from 'react'
import userStore from "../stores/index.js";
import { useNavigate } from 'react-router-dom';
export default function CreateTask() {
   
    const [task, setTask] = useState("")
    const [type, setType] = useState("")

    const navigate = useNavigate()
    const {setTaskZustand } = userStore()

    function createTask() {
      
       const nuevaTarea = {
        type:type,task:task,completed:false,
       }
       setTaskZustand(nuevaTarea)
       navigate("/taskList")
    }
   
  return (
  
    <div className='algo' style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
       <h1>Create Task</h1>
       <form onSubmit={createTask}>
     <label>
        Task:
        <input
            id='Task'
            value={task}
            onChange={(e)=> setTask(e.target.value)}
            type='text'
        />
     </label>
     <div style={{margin:"10px", padding:"10px", border:"solid", backgroundColor:"yellow"}}>
        <h4>Clasificacion de tarea:</h4>
        <input
             type='checkbox'
             id="Important"
             name="Important"
             onChange={(e)=> setType(e.target.id)}
        />
     <label htmlFor="Important">Important</label>
     <input
             type='checkbox'
             id="Normal"
             name="Normal"
             onChange={(e)=> setType(e.target.id)} 
        />
     <label htmlFor="Normal">Normal</label>
     </div>
     <button onSubmit={createTask}>Crear Nueva Tarea</button>

     </form>
    </div>
  )
}
