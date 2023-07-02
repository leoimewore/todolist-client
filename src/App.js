import React from "react";


import Homepage from "./components/Homepage";

import { BrowserRouter, Routes, Route,HashRouter} from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ReactNotifications } from 'react-notifications-component'

function App() {


 let login

  if(localStorage.getItem("loginUser")){
  login=true
  }else{
    login=false
  }



  console.log(login)

  return (
    <>
    <ReactNotifications/>
      <HashRouter>
        <Routes>
  
    
        {<Route path="/" element={<Homepage login={login}/>}/>}
    
        {<Route path="login" element={<Login login={login}/>}/>}
       
          <Route path="signup" element={<Signup/>}/>
   
  
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
