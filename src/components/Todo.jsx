import React from "react";
import {default as logo1} from "../icon-cross.svg"
import axios from "../axios"
import { useNavigate } from "react-router-dom";


function Todo({theme,setTodos,todos,item,fetch,setFetch}) {

const navigate=useNavigate()
const removeTodo=async function(){
 


  

  await axios.delete("/todo/delete",{ 
    data: { taskId:item.todo_id,
      token:JSON.parse(localStorage.getItem("loginUser")).token}, 
    headers: 
    { "Authorization":"Bearer " + JSON.parse(localStorage.getItem("loginUser")).token} })
    .then((res)=>
    setFetch(!fetch)).catch((error)=>console.log(error))





}

const checkComplete=async function(){
  setTodos(todos.map(el=>{
    if(el.todo===item.todo){
        return {
            ...el,completed:!el.completed
        }
        
    }else{
      return el
    }
}
))


  await axios.put("/todo/update",
  {     
    headers: {
      Authorization:
         "Bearer " + JSON.parse(localStorage.getItem("loginUser")).token,
     },
     data:{
      taskId:item.todo_id
    }
   } 
  ).then((res)=>console.log(res)).catch((error)=>console.log(error))
 

  console.log(todos)
}









  return (
    
      
        <ul className={`todolists ${theme ? "todo_bg-active":"todo_bg-unactive"}`}>
          <li className="todolist_item">
            {/* <div className={"checkbox_container"}>
              <input type="checkbox" id={item.todo}/>
              <label onClick={checkComplete} htmlFor={item.todo}  className={item.completed ? "completed": ""}>{item.todo}</label>
            </div> */}
            <div className={"checkbox_container"}>
              <input type="checkbox" id={item.todo} checked={item.completed ? true:false}/>
              <label onClick={checkComplete} htmlFor={item.todo}  className={item.completed ? "completed": ""}>{item.todo}</label>
            </div>
            <img src={logo1} alt="remove-icon" onClick={removeTodo}/>
          </li>
        </ul>



        
        
        
        
        
     
  );
}

export default Todo;


