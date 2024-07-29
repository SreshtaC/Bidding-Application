import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../Login/Login.css'
import i2 from './i2.png'

function Signup() {    

    const [name, setName] = useState()
    const [lname, setLname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/api/users/signup", { name, lname, email, password })
        .then(result => {console.log(result);
            if (result.data.msg === "Successfully Registered") {
                navigate("/login");
              } else {
                alert("Registration failed. Please try again.");
              }
        })
        .catch(err => console.log(err))
    }


  return (
    <div className="box2">
        <div>
        <div className="">
        <h2 className="space" >Sign Up</h2>
        <p className="space smaller">New bidders, as soon as you have submitted your information you will be eligible to bid in the auction.</p>
        </div>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label className="space" htmlFor="email">
                        Name
                    </label>
                    <input type="text" 
                    placeholder='Enter Name' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control fin space'
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="">
                    <label className="space" htmlFor="email">
                        Last Name
                    </label>
                    <input type="text" 
                    placeholder='Enter Last Name' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control fin space'
                    onChange={(e) => setLname(e.target.value)}
                    />
                </div>
                <div className="">
                    <label className="space" htmlFor="email">
                        Email Address
                    </label>
                    <input type="email" 
                    placeholder='Enter Email' 
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
                    <input type="password" placeholder='Enter Password' name='password' 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    className='form-control fin space' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button type="submit" className="btn btn-success con space">
                    Sign Up
                </button>
                </form>
                <p>Already have an account? <span>
                <Link to="/login" className="btn btn-default ">
                    Login
                </Link>
                </span></p>
                <div className="i">
                    <img src={i2} alt="signup-pic"/>
                </div>
        </div>
    </div>
  );
}

export default Signup;