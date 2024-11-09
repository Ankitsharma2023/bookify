import React  from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

const RegisterPage=()=>{

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
    console.log("Signingupwith user ")
  const result = await  firebase.signUpUserWithEmailAndPassword(email , password) //PAGE WILL NOT RELOAD ON SUBMIT
  console.log("successfully signed up " , result )
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
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
        onChange = {(e)=>setPassword(e.target.value)}
        value = {password}
        type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
    </div>
}

export default RegisterPage;