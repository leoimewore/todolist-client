import React,{useEffect,useState} from "react";
import axios from "../axios"



function Filter({todos,setFetch,fetch,setFilter,setStatus,activeTodoCounts}){

   
let activeTodo
    const showActive=(e)=>{
        setStatus(e.target.innerHTML)
        
    
    }

    
    const showAll=(e)=>{
        setStatus("All")
        setFilter(todos)

        console.log(todos)
       
    }

const handleCompleted=(e)=>{
setStatus(e.target.innerHTML)

}

setFetch()



const clearCompleted=async()=>{

    
   await axios.delete("/todo/clear",{ 
        data: { userId:todos[0].userId,
            completed:true,
          token:JSON.parse(localStorage.getItem("loginUser")).token}, 
        headers: 
        { "Authorization":"Bearer " + JSON.parse(localStorage.getItem("loginUser")).token} })
        .then((res)=>
        setFetch(!fetch)).catch((error)=>console.log(error))
    


      
}



    






return(
    <section className="filter_container">
        <p>{activeTodoCounts} items left</p>
        <div className="filter_buttons_desktop">
            <p onClick={showAll}>All</p>
            <p onClick={showActive}>Active</p>
            <p onClick={handleCompleted}>Completed</p>
        </div>
        <p onClick={clearCompleted} className="clear_completed">Clear Completed</p>
    </section>
)
}

export default Filter