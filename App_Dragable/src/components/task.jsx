import React, { useState } from "react";
import "../css/task.css";
import { useNavigate } from "react-router-dom";

export default function Task({ completed, task, type, id }) {
  const [Completed, setCompleted] = useState(completed);
  const navigate = useNavigate()  
  function cambioEstado() {
    setCompleted(!Completed);
  }
 
  return (
    <div
      className={`card ${Completed ? "completed" : ""}`}
      draggable={true}
      key={id}
    >
      <h2 className="tarea">
        Tarea:
        {!Completed ? (
          <h2>{task}</h2>
        ) : (
          <h2 style={{ textDecoration: "line-through" }}>{task}</h2>
        )}
      </h2>
      <h2 className="typo">Tipo:{type}</h2>
      <h2 className="estado">
        {!Completed ? (
          <h2 className="pendiente">Pendiente</h2>
        ) : (
          <h2 className="completa">Completa</h2>
        )}
      </h2>
      <button onClick={cambioEstado}>Cambio estado</button>
      <button onClick={()=>navigate(`/editTask/${id}`)}>Edit task</button>
    </div>
  );
}
