import React from 'react'
import "../css/task.css"

export default function Task({completed,task,type}) {
 
    return (
    <div className='card'>
      <h2 className='tarea'>Tarea:{task}</h2>
      <h2 className='typo'>Tipo:{type}</h2>
      <h2 className='estado'>Estado:{!completed?("Pendiente"):("Completa")}</h2>
    </div>
  )
}
