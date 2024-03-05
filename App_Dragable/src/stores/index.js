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

  setTasksZustand: (tasksUser) => { set( { tasksUser } )},
  setTaskZustand:async (newTask)=> {

 // Obtén el estado actual de tasksUser
const { tasksUser,dataUser } = get();



newTask.personaId = dataUser.idPersona


try {
   // Crea una nueva versión de tasksUser con la nueva tarea
const updatedTasksUser = [...tasksUser, newTask];
// Actualiza el estado de tasksUser
set({ tasksUser: updatedTasksUser });
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
 
  console.log(JSON.stringify(response.data));
} catch (error) {
  console.log(error);
  // Si hay un error, deshacer la actualización del estado
  set({ tasksUser });
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
  console.log("ACA ESTOY CON LAS TASKS")
  console.log(JSON.stringify(response.data));
   set({tasksUser: response.data})
 })
.catch((error) => {
  console.log(error);
});


  },
  logOut:(dataUser,tasksUser)=>{set({tasksUser:[]}),set({dataUser:[]}) }

})));


export default useStore;


