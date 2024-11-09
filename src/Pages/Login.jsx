import React  from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useEffect } from "react";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";

const LoginPage=()=>{

 const firebase = useFirebase();
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const navigate = useNavigate();

 useEffect(()=>{
    if(firebase.isLoggedIn){
        //navigate to home
        navigate('/');
    }},[firebase.isLoggedIn])

 const handleSubmit= async(e) => {
    e.preventDefault();
    console.log("Login user ")
  const result = await  firebase.signInUserWithEmailAndPass(email , password) //PAGE WILL NOT RELOAD ON SUBMIT
  console.log("successfully logged up " , result )
}

    return <div className="container mt-5" >
        <Form onSubmit = {handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
         onChange = {(e)=>setEmail(e.target.value)}
         value = {email}
        type="email"
         placeholder="Enter email"
          />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
        onChange = {(e)=>setPassword(e.target.value)}
        value = {password}
        type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
       Login
      </Button>
    </Form>
    <h1 className="mt-5 mb-5">Or </h1>
    <Button 
    onClick={async () => {
        try {
            const result = await firebase.signInWithGoogle();
            console.log("Successfully signed in with Google", result);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }} 
    variant="danger"
>
    SignInWithGoogle
</Button>
    </div>
}

export default LoginPage;