import React from 'react'
import { useState } from 'react';
import {Link} from "react-router-dom"
import Homepage from './Homepage';

import { Navigate } from 'react-router-dom';
import Notification from '../Notification';
import {Typography, Card, Grid, Button, TextField, CardContent } from '@mui/material';
import axios from "../axios"



const Signup = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [bool,setBool]=useState(false)
    const [registered, setRegistered]=useState(false)

    const [message,setMessage]=useState("")


    

let title




const  handleSubmit=async (e)=>{
    e.preventDefault()

  

    try{
        const resp=await axios.post("/user",{
            name:fullName,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        
    })
            console.log(resp.data)
            setRegistered(true)
            setBool(true)
            localStorage.setItem("userInfo",JSON.stringify(resp.data))
            
            title="Registeration Successful"

            
            Notification(`${fullName} is registered succesfully`,title,`success`)

            window.location.reload()
            
    }catch (error){
        console.log(error.response)
        title="Not Successful"

        if(error.response.data=== "That user already exists!"){
            setMessage(error.response.data)
            Notification("That user already exists!",title,"danger")

        }else{
            setMessage(error.response.data.msg)
            Notification(error.response.data.msg,title,"danger")
        }
        
    }


     


}




  return (
    <>
            {<Card style={{maxWidth:"600px",margin:"10px auto",padding:"20px 5px"}}>

                <CardContent>

                <Typography variant='h2' gutterBottom sx={{textAlign:"center"}}>Sign Up</Typography>

                

                <div style={{display:"flex",marginLeft:"auto",marginRight:"auto"}}>
                
                    {(message==="That user already exists!")&& <Button component={Link} to="/login">Login</Button>}
                </div>
                
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextField label="Full Name" 
                                variant='outlined' 
                                fullWidth required 
                                value={fullName}
                                onInput={(e)=>setFullName(e.target.value)}/>
    
                            </Grid>
    
                            <Grid xs={12} item>
                                <TextField type="email" label="Email" variant="outlined" fullWidth required value={email} onInput={(e)=>setEmail(e.target.value)}/>
    
                            </Grid>
    
                            <Grid xs={12} item>
                                <TextField type="number" label="Phone Number" variant="outlined" fullWidth required/>
                            </Grid>
    
                            <Grid xs={12} item>
                        <TextField type="password" label="Password" variant="outlined" fullWidth required value={password} onInput={(e)=>setPassword(e.target.value)}/>
                    </Grid>

                    {/* <Grid xs={12} item>
                       <PasswordInputs onInput={(e)=>setPassword(e.target.value)}/>
                    </Grid> */}

                   

                    <Grid xs={12} item>
                        <TextField type="password" 
                        label="Confirm Password" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        value={confirmPassword}
                        onInput={(e)=>setConfirmPassword(e.target.value)}/>
                    </Grid>
                    
                            <Grid xs={12} item>

                               <Button type='submit' variant='contained' fullWidth>Submit</Button>
    
                            </Grid>

                          { registered&& <div style={{display:"flex",marginLeft:"auto",marginRight:"auto"}}>
                  
                    {<Button component={Link} to="/login">Login</Button>}
                </div>}
    
                        </Grid>
                    </form>
                </CardContent>
            </Card>}
        </>
  )
}

export default Signup