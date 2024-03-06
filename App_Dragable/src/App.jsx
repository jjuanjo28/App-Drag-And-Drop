import { useState, useEffect } from 'react'
import mainStore from "./stores/index.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Cookies from "universal-cookie"
import './App.css'
import ComponenteUno from './components/ComponenteUno'
import ComponenteDos from './components/ComponenteDos'
import ComponenteTres from './components/ComponenteTres'
import ComponenteHome from "./components/ComponenteHome"
import Nav from './components/Nav'
import Tasks from './components/Tasks';
import CreateUser from './components/CreateUser';
import CreateTask from './components/CreateTask.jsx';
import axios from 'axios';


function App() {
 
  const { setUserZustand, setTasksZustand,logOut } = mainStore()
  const cookies = new Cookies
  const [user, setUser] = useState([])

  const [logged, setLoged] = useState(false)
  const [idNumber, setIdNumber] = useState("")

  
useEffect(() => {
if(logged){
console.log("el user esta logueado")
console.log("soy el id:",idNumber)
console.log("este es el cookie en App:",cookies.get("idToken"))
adquiereUser()
} else {
  logOut()
  setLoged(false)
}
}, [logged])

const adquiereUser=()=>{

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/users/${idNumber}`,
    headers: { 
      'Authorization':  `Bearer ${cookies.get("idToken")}`
    }
  };
  
  axios.request(config)
  .then((response) => {
    setUserZustand(response.data)
    captureTasks(idNumber)

  })
  .catch((error) => {
    console.log(error);
  });
}
function captureTasks(id) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/tasks/user/${idNumber}`,
    headers: { 
      'Authorization': `Bearer ${cookies.get("idToken")}`
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log("ACA ESTOY CON LAS TASKS en App.jsx")
    console.log(JSON.stringify(response.data));
    setTasksZustand(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
  
  
}
 
  return (
    <>
     <div>
      <Router>
      <Nav setUser={setUser} user={user} logged={logged} setLoged={setLoged}/>
      
       <Routes>
        <Route exact path="/" element={<ComponenteHome logged={logged}/>} />
        <Route path='/login' element={<Login setUser={setUser} setLoged={setLoged} setIdNumber={setIdNumber}/>}/>
        <Route path='/createUser' element={<CreateUser setUser={setUser} setLoged={setLoged}/>}/>
        <Route path='/createTask' element={<CreateTask/>}/>
        <Route path='/componenteUno' element={<ComponenteUno/>}/>
        <Route path='/componenteDos' element={<ComponenteDos/>}/>
        <Route path='/componenteTres' element={<ComponenteTres/>}/>
        <Route path='/taskList' element={<Tasks />}/>
       </Routes>
     
    
      </Router>
      </div>
    </>
  )
}

export default App
