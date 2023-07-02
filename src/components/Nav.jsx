import React from 'react'
import "./App.css";
import {default as logo} from "./icon-moon.svg"
import logo1 from "./icon-sun.svg"


import { useState } from 'react'

const Nav = () => {

    const [theme,setTheme]=useState("true");


    const handleTheme=function(e){
        setTheme(!theme)
        }





  return (
   
 <header className={theme?"active-theme":"inactive-theme"}>
          <div className="header_wrapper">
            <h1>TODO</h1>
            <img src={theme ? logo:logo1} alt="sun-icon" onClick={handleTheme}/>
          </div>
          <form>
            <input type="text" value={input}onChange={handleInput} className={`create_todo ${theme? "bg_class-active":"bg_class-inactive"}`} placeholder="Create a new todo..." />
            <button type="submit" className={`add_todo ${theme? "bg_class-active":"bg_class-inactive"}`} onClick={submitTodo}>Add</button>
          </form>
        </header>



  )
}

export default Nav