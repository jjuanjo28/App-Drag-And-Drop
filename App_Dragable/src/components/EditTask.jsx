import React, {useState, useEffect} from 'react'


export default function EditTask() {
    const [idTask, setIdTask] = useState("")
    useEffect(() => {
              setIdTask(window.location.pathname.toString().slice(10))
    }, []);
    
  return (
    <div>
      Soy edit task
      <h1>Este es mi id de la tarea: {idTask}</h1>
    </div>
  )
}
