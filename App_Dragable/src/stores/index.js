import { create } from "zustand";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies
import { devtools } from 'zustand/middleware'

const useStore = create(devtools((set, get) => ({
  dataUser: [],
  tasksUser: [],

  setUserZustand: (dataUser) => { 
      set( { dataUser } ) 
  },

  setTasksZustand: (tasks) => { set( { tasksUser: tasks } )},
  
  setTaskZustand:async (newTask)=> {

 // Obtén el estado actual de tasksUser
const { tasksUser,dataUser } = get();

newTask.personaId = dataUser.idPersona


try {

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/tasks/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("idToken")}`,
    },
    data: newTask,
  };

  const response = await axios.request(config);
  
} catch (error) {
  console.log("este es mi error!!!:",error.response.data.error);
    // Si hay un error, deshacer la actualización del estado
 if(error.response.data.error == "token expired"){
  console.log("esto es dataUser:",dataUser)
 }
}

let newConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `http://localhost:3000/tasks/user/${newTask.personaId}`,
  headers: { 
    'Authorization': `Bearer ${cookies.get("idToken")}`
  }
};

axios.request(newConfig)
.then((response) => {
  console.log("ACA ESTOY CON LAS TASKS EN Index.js")
  const updatedTasksUser = response.data
  console.log("soy tasksUser despues:",updatedTasksUser)
  set({tasksUser:updatedTasksUser } );
  console.log("aca despues de actualizar:", tasksUser)
}


)
.catch((error) => {
  console.log(error);
});


  },
  deleteTask:(taskId) => {
   console.log("soy la task a borrar:",taskId)
   const {tasksUser} = get()
   const nuevaLista = tasksUser.filter(task => task.id != taskId)
  // filter(task => task.id != taskId)
  set({tasksUser:nuevaLista } );
 
  },
  logOut:(dataUser,tasksUser)=>{set({tasksUser:[]}),set({dataUser:[]}) }

})));


export default useStore;


