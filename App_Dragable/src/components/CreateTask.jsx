
import React, { useState } from 'react';
import userStore from "../stores/index.js";
import { useNavigate } from 'react-router-dom';

export default function CreateTask() {
   
    const [task, setTask] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();
    const { setTaskZustand, tasksUser } = userStore();

  const createTask = (e) =>{
       e.preventDefault(); // Evita que se recargue la página
       const nuevaTarea = {
            type: type,
            task: task,
            completed: false,
       };
       setTaskZustand(nuevaTarea);
       const data = [...tasksUser,nuevaTarea]
       console.log("soy la nueva tarea en createTask:",nuevaTarea)
       console.log("soy la data:", data)
       navigate("/taskList");
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
                        onChange={(e) => setTask(e.target.value)}
                        type='text'
                    />
                </label>
                <div style={{margin:"10px", padding:"10px", border:"solid", backgroundColor:"yellow"}}>
                    <h4>Clasificacion de tarea:</h4>
                    <input
                        type='radio'
                        id="Important"
                        name="taskType"
                        onChange={(e) => setType(e.target.id)}
                    />
                    <label htmlFor="Important">Important</label>
                    <input
                        type='radio'
                        id="Normal"
                        name="taskType"
                        onChange={(e) => setType(e.target.id)} 
                    />
                    <label htmlFor="Normal">Normal</label>
                </div>
                <button type="submit">Crear Nueva Tarea</button>
            </form>
        </div>
    );
}