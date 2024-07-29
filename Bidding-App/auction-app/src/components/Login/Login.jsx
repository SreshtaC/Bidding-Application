import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './Login.css'
import i from './i.png'

function Login() {    

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/api/users/login", { email, password })
 .then(result => {
    if (result.data && typeof result.data === 'object') {
      localStorage.setItem("user", JSON.stringify(result.data));
      setTimeout(() => {
        const userData = localStorage.getItem("user");
        console.log("User data:", userData);
      }, 100); // add a small delay
      navigate("/");
    } else if (result.data === "Incorrect") {
      alert("Incorrect Password!");
    } else {
      navigate("/signup");
      alert("You are not registered to this service");
    }
  })
 .catch(error => {
    console.error(error);
  });
    }


  return (
    <div className="box">
        <div class="hed">
            <h2 className='space'>Login</h2>
            <p className="space smaller">Welcome back. Enter your credentials to access your account</p> <br/>
        </div>
            <form onSubmit={handleSubmit}>
                
                <div className="">
                    <label className="space" htmlFor="email">
                        Email Address
                    </label>
                    <input type="email" 
                    placeholder='hello@example.com' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control fin space' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="">
                    <label className="space" htmlFor="email">
                        Password
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password'
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    className='form-control fin space' 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br/>
                <div>
                    <input className="check space" type="checkbox"/><label for="">Keep me signed in</label>
                </div><br/>
                <button type="submit" className="btn btn-success con space">
                    Continue
                </button>
                </form>
                <p>Don't have an account? <span>
                <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
                </span>
                </p>
                <div class="i">
                    <img src={i} alt="login-pic"/>
                </div>
        </div>
  );
}

export default Login;

