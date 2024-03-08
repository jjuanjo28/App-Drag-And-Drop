
import axios from "axios";
import React, { useState } from "react";
import Task from "./task.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useStore from "../stores/index.js";
import "../css/tasks.css";

const cookies = new Cookies

export default function Tasks() {
  const {deleteTask,tasksUser} = useStore((state)=>{
    return { tasksUser: state.tasksUser, deleteTask: state.deleteTask }
  })
  const navigate = useNavigate();
  const [id, setId] = useState("")
  
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("task-id");
    setId(taskId)
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/tasks/${taskId}`,
      headers: { 
        'Authorization': `Bearer ${cookies.get("idToken")}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      if(response.data.message =="Prestamo Eliminado"){
        deleteTask(taskId)
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
  }
 
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  return (
    <div key={id} className="task-container">
      {tasksUser.map((task) => (
          <div className="task-item" onDragStart={(e) =>{
            e.dataTransfer.setData("task-id", task.id)}}>

          <Task
            key={task.id}
            id={task.id}
            type={task.type}
            completed={task.completed}
            task={task.task}
            draggable
            />
          </div>
        
        )) }
      <div className="trash"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
       >
        <h2>Trash here!!!</h2>
      <button onClick={() => navigate("/createTask")}>Create Task</button>
      </div>
      </div>
   
  );
}

// import axios from "axios";
// import React, { useState } from "react";
// import Task from "./task.jsx";
// import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
// import useStore from "../stores/index.js";
// import "../css/tasks.css";

// const cookies = new Cookies;

// export default function Tasks() {
//   const { deleteTask, tasksUser } = useStore();
//   const navigate = useNavigate();
//   const [id, setId] = useState("");

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const taskId = e.dataTransfer.getData("task-id");
//     setId(taskId);
//     let config = {
//       method: 'delete',
//       maxBodyLength: Infinity,
//       url: `http://localhost:3000/tasks/${taskId}`,
//       headers: { 
//         'Authorization': `Bearer ${cookies.get("idToken")}`
//       }
//     };

//     axios.request(config)
//     .then((response) => {
//       if (response.data.message === "Prestamo Eliminado") {
//         deleteTask(taskId);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };
  
//   return (
//     <div className="tasks-container">
//       <div className="task-items">
//         {tasksUser.map((task) => (
//           <div className="task-item" key={task.id} onDragStart={(e) => {
//             e.dataTransfer.setData("task-id", task.id);
//           }}>
//             <Task
//               id={task.id}
//               type={task.type}
//               completed={task.completed}
//               task={task.task}
//               draggable
//             />
//           </div>
//         ))}
//       </div>
//       <div className="trash" onDrop={handleDrop} onDragOver={handleDragOver}>
//         <h2>Trash here!!!</h2>
//         <button onClick={() => navigate("/createTask")}>Create Task</button>
//       </div>
//     </div>
//   );
// }
