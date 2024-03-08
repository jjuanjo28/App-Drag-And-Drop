import React, { useState } from 'react'
import "../css/task.css"

export default function Task({completed,task,type,id}) {
  const [Completed, setCompleted] = useState(completed)
  function cambioEstado() {
     setCompleted(!Completed)
  }
 
    return (
    <div className={`card ${Completed ? 'completed' : ''}`}  draggable={true} key={id}>
     
      <h2 className='tarea'>Tarea:{!Completed? <h2  >{task}</h2>:<h2 style={{textDecoration:"line-through"}}>{task}</h2>}</h2>
      <h2 className='typo'>Tipo:{type}</h2>
      <h2 className='estado'>Estado:{!Completed?<h2 className='pendiente'>Pendiente</h2>:<h2 className='completa'>Completa</h2>}</h2>
      <button onClick={cambioEstado}>Cambio estado</button>
    </div>
  )
}
