import React from 'react'
import "../App.css";
import Todo from "./Todo"
import Filter from "./Filter";
import {Link, useNavigate }from "react-router-dom"
import { useState,useEffect } from 'react';
import {default as logo} from "../icon-moon.svg"
import logo1 from "../icon-sun.svg"
import { Navigate } from 'react-router-dom';
import axios from "../axios"
import Notification from '../Notification';





const Homepage = ({item,login}) => {

    const [theme,setTheme]=useState("true");
    const [complete,setComplete]=useState("true")
 
    const[input,setInput]=useState("")
 
    const[todos,setTodos]=useState([])
    const[currentStatus,setStatus]=useState("All")
    const[filter,setFilter]=useState([])
    const[activeTodoCounts,setActiveTodoCounts]=useState(0)
    const [loggedIn,setLoggedIn]=useState(false)
    const [fetch,setFetch]=useState(false)

   


 

  useEffect(()=>{
    setLoggedIn(login)
	}, [])
 

    useEffect(()=>{
      const uncompletedTodos=todos.filter(el=> el.completed===false)
      setActiveTodoCounts(uncompletedTodos.length)
      
    },[todos])
 
 
 console.log(loggedIn)
 
 
   const filterTodos=function(){
     switch(currentStatus){
     case "Completed":
       setFilter(todos.filter(el=>el.completed===true))
       break;
     
     
     case "Active":
       setFilter(todos.filter(el=>el.completed===false))
     break;
     
     default:
       setFilter(todos)
       break;
   }
 }





 
 
 
 //Save to Local Storage
 
 const saveLocalTodos=()=>{
   if(localStorage.getItem("todos")===null){
       localStorage.setItem("todos",JSON.stringify([]))
   }else{
       localStorage.setItem("todos",JSON.stringify(todos))
   }
 
 }
 
 
//  const getLocalTodos=()=>{
//    if(localStorage.getItem("todos")===null){
//      localStorage.setItem("todos",JSON.stringify([]))
//  }else{
//      localStorage.setItem("todos",JSON.stringify(todos))
//  }
 
//  }
//   //use effect allows us to run a function everytime a piece of state changes 
 
//  useEffect(()=>{
//  getLocalTodos()
//  },[])
 
 
 
 
 
  useEffect(()=>{
   filterTodos()
   saveLocalTodos()
   
      },[currentStatus,todos])




      //Fetch Data from Mongo/////--------.//////////

      async function fetchData() {
        try{
            if(token){
        
              const resp=await axios.post("/todo/get",{userId:token?.userId})
              console.log(resp.data.todo)
              setTodos(resp.data.todo)
            }
           
        
          }catch(error){
            console.log(error)
          }
          //   // You can await here
          //   const response = await MyAPI.getData(someId);
          //   // ...
           }
 
 
 
 
 
//Handle input in the form
    const handleInput =function (e){
     
     let input=e.target.value
 
     setInput(input)
    }



 //Submit new todo
    const submitTodo=function(e){
 
     e.preventDefault()
     
     
     if(input.length!==0){
      let newTodo={text:input,completed:false, id:Math.random()*1000}
    //  setTodos([...todos,newTodo])

     axios.post("/todo",
     
     {


      
      headers: {
        Authorization:
           "Bearer " + JSON.parse(localStorage.getItem("loginUser")).token,
       },
       data:{
        userId:JSON.parse(localStorage.getItem("loginUser")).userId,
        todos:newTodo.text,
        completed:newTodo.completed,
        active:!newTodo.completed,
        todo_id:newTodo.id,
        date:Date.now()
      }
     })
     .then(function (response) {

      Notification("Added New Task","Successful","success")
      setFetch(!fetch);
    })
    .catch(function (error) {
      console.log(error);
    })

     setInput("")


     }


    }



    /////////////////////////-------------------
const handleTheme=function(e){
 setTheme(!theme)
 }


let token=JSON?.parse(localStorage.getItem("loginUser"))

console.log(token)












useEffect(() => {
  
  fetchData();
}, [fetch])






let navigate=useNavigate()


 const handleLogout=async()=>{



//post request to log out
  axios.post("/logout",
    {
      headers: {
       Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("loginUser")).token,
      }})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  localStorage.removeItem("loginUser")
  window.location.reload()
  

 








  
 }
 







  return (
    <div className="App"   style={{backgroundColor:theme ? '#f2f2f2': "#393a4b"}}>
    <header className={theme?"active-theme":"inactive-theme"}>
      <div className="header_wrapper">
        <h1>TODO</h1>
        <div className="button_wrapper">
          {!loggedIn&&<Link to="/login"><button className="auth_btn">Login</button></Link>}
         {!loggedIn&&<Link to="/signup"><button className="auth_btn">Sign Up</button></Link>}
         {loggedIn&&<Link><button className="auth_btn" onClick={handleLogout}>Log Out</button></Link>}
        
        <img src={theme ? logo:logo1} alt="sun-icon" onClick={handleTheme} className="theme_img"/>
        </div>
      </div>
     {login&&<form>
        <input type="text" value={input}onChange={handleInput} className={`create_todo ${theme? "bg_class-active":"bg_class-inactive"}`} placeholder="Create a new todo..." />
        <button type="submit" className={`add_todo ${theme? "bg_class-active":"bg_class-inactive"}`} onClick={submitTodo}>Add</button>
      </form>}
    </header>


    <main>
  {login&&<div className={`todolists_container ${theme ? "todo_bg-active":"todo_bg-unactive"}`}>
    {filter.map((item)=>(
    <Todo key={item._id}
    theme={theme} 
    setTheme={setTheme} 
    todos={todos} 
    setTodos={setTodos} 
    input={input} 
    setInput={setInput} 
    item={item}
    complete={complete}
    fetch={fetch}
    setFetch={setFetch}
    setComplete={setComplete}
    filter={filter}/>))}




    <Filter theme={theme}
    setFilter={setFilter}
    setTheme={setTheme} 
    todos={todos} 
    setTodos={setTodos} 
    input={input} 
    setInput={setInput} 
    item={item}
    setStatus={setStatus}
    currentStatus={currentStatus}
    activeTodoCounts={activeTodoCounts}
    setFetch={setFetch}
    fetch={fetch}
    complete={complete}
    setComplete={setComplete}/>
    </div>}
    {/* <div className={`filter_buttons_mobile ${theme ? "filter_mb-active":"filter_mb-unactive"}`}>
          <p>All</p>
          <p>Active</p>
          <p>Completed</p>
      </div> */}

    </main>
  </div>
  )
}

export default Homepage