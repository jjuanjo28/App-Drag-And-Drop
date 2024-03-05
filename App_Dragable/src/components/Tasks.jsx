import React, { useState, useEffect } from "react";
import Task from "./task.jsx";
import dataUser from "../stores/index.js";
import { useNavigate } from "react-router-dom";
import {useDragAndDrop} from "@formkit/drag-and-drop/react"

export default function Tasks({ looged }) {

const navigate = useNavigate()
console.log("userData en tasks:",dataUser.getState())
//console.log("userData en tasks:",userData.taskList.getState())

const [tasksZustand, setTaskZustand] = useState(dataUser.getState().tasksUser)
useEffect(() => {
console.log("Se agregaron tasks");
}, [tasksZustand])

  return (
    <>
    <div>
      
      { tasksZustand?  tasksZustand.map((task) =>( 
           
            <Task
              key={task.id}
              type={task.type}
              completed={task.completed}
              task={task.task}
            />
          
      ))
        : null }

       
      {looged ? <button onClick={()=>navigate("/createTask")}>Create Task</button> : null}
       
    <button onClick={()=>console.log(tasksZustand)}>taskSustand</button>
    </div>
    <div className={"trash"} >
     <h2>Trash here!!!</h2>
    </div>
    
    </>
  );
}
