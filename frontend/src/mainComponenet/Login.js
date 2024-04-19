import React, { useContext } from 'react'
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from 'react';

import { UserContext } from "../App";
const Login = () => {

  // logout toogle
    // logout toogle

    const {state, dispatch} = useContext(UserContext)


    const navigate = useNavigate();
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
  
    const loginUser = async (e) => {
      e.preventDefault();
     
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });
    
      const data = await res.json()
      if (res.status === 400 || !data) {
        window.alert("Invalid crediential")
        console.log("Invalid crediential");
      }else{
        dispatch({type:"USER", payload:true})
        window.alert("Login Succesfully")
        console.log("Login Succesfully");
        navigate('/');
        
      }
    }
  


 
return (
  <Wrapper>
    <h2 className="common-heading">Login page</h2>

    <div className="container">
      <div className="contact-form" method="POST">
        <form
          method="POST"
          className="contact-inputs">

          <input
            type="email"
            name="email"
            placeholder="Enter you Email"
            autoComplete="off"
            value={email} onChange={(e) => setEmail(e.target.value)}
      
          />

          <input
            name="password"
            type="text"
            value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            placeholder="Enter you Password"></input>
          <NavLink to="/reset" style={{fontSize: "17px", textAlign: "start"}}>ForgotPassword</NavLink>
          <input type="submit" onClick={loginUser} value="Login" />
        </form>
      </div>
    </div>
  </Wrapper>
);
};


const Wrapper = styled.section`
padding: 9rem 0 5rem 0;
text-align: center;

.container {
margin-top: 6rem;

.contact-form {
  max-width: 50rem;
  margin: auto;

  .contact-inputs {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    input[type="submit"] {
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.btn};
        color: ${({ theme }) => theme.colors.btn};
        transform: scale(0.9);
      }
    }
  }
}
}
`;
export default Login


