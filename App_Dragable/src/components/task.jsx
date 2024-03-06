import React from 'react'
import "../css/task.css"

export default function Task({completed,task,type,id}) {
 
    return (
    <div className='card' draggable={true} key={id}>
      <h2>id: {id}</h2>
      <h2 className='tarea'>Tarea:{task}</h2>
      <h2 className='typo'>Tipo:{type}</h2>
      <h2 className='estado'>Estado:{!completed?("Pendiente"):("Completa")}</h2>
    </div>
  )
}
