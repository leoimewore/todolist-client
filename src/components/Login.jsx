import React from 'react'
import {Typography, Card, Grid, Button, TextField, CardContent } from '@mui/material';
import {Link} from "react-router-dom"
import { useState} from 'react';
import Homepage from './Homepage';
import Spinner from './Spinner';

import { useNavigate } from 'react-router-dom';
import Notification from '../Notification';
import axios from "../axios.js"







const Login = () => {




const{userLoggedIn,setUserLogged}=useCartContext()

const navigate=useNavigate()
 

const [loginEmail,setLoginEmail]=useState("")
const [loginPassword,setLoginPassword]=useState("")
const [loading,setLoading]=useState(false)
const [error,setError]=useState(false)


const handleLogin=async(event)=>{
event.preventDefault()


try{

  setLoading(true)
   const response=await axios.post("/login",{
        email:loginEmail,
        password:loginPassword,})

        localStorage.setItem("loginUser",JSON.stringify(response.data))
        console.log(response.data)


    setLoading(false)


   
    navigate("/")

    Notification("Welcome","Logged in Successfuly","success")
    window.location.reload()
   
        
        
}catch (error){
    setLoading(false)
    console.log(error)
   
   setError(error.response.data.msg)

    Notification("Not Successful",error.response.data.msg,"danger")
  


    
}


 }







  return (
    <div>
       
       {loading &&<div style={{display:"flex",justifyContent:"center",height:"100vh",width:"100%",alignItems:"center"}}><Spinner loading={loading}/></div>}
    {<Card style={{maxWidth:"600px",margin:"10px auto",padding:"20px 5px"}}>

        <CardContent>
        <Typography variant='h4' gutterBottom sx={{textAlign:"center"}}>Login to Todo App</Typography>
       
            <form onSubmit={handleLogin}>
                <Grid container spacing={1}>
                   
                    <Grid xs={12} item>
                        <TextField 
                        type="email" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth required
                        value={loginEmail}
                        onInput={(e)=>setLoginEmail(e.target.value)}
                        />

                    </Grid>

                    <Grid xs={12} item>
                        <TextField type="password" 
                        label="Password" 
                        variant="outlined" 
                        fullWidth required
                        value={loginPassword}
                        onInput={(e)=>setLoginPassword(e.target.value)}/>
                    </Grid>

                    <Grid xs={12} item>
                       <Button type='submit' variant='contained' fullWidth>Submit</Button>

                    </Grid>

                    <Link to="/signup"><Button variant='body2'> Sign Up</Button></Link>

                </Grid>
            </form>
        </CardContent>
    </Card>}
</div>



  )
}

export default Login