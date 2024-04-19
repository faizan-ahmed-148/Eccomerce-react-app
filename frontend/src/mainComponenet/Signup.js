import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState ({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });
  let name, value;


  const handleInputs = (e)=>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value})
    console.log(name);
    console.log(value);
  }

  const postData = async (e)=>{
  e.preventDefault();
  const {name, email, phone, work, password, cpassword} = user;
  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, email, phone, work, password, cpassword
    })
  });

  const data = await res.json()
  if (res.status === 422 || !data) {
    window.alert("Invalid crediential")
    console.log("Invalid crediential");
  }else{
    window.alert("SignUp Succesfully")
    console.log("SignUP Succesfully");
    navigate('/Login');
    
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
              type="text"
              name="name"
              placeholder="Enter you name"
              autoComplete="off"
              value={user.name} onChange={handleInputs}
        
            />
            <input
              type="email"
              name="email"
              placeholder="Enter you Email"
              autoComplete="off"
              value={user.email} onChange={handleInputs}
        
            />
            <input
              type="number"
              name="phone"
              placeholder="Enter you phone"
              autoComplete="off"
              value={user.phone} onChange={handleInputs}
        
            />
            <input
              type="text"
              name="work"
              placeholder="Enter you profession"
              autoComplete="off"
              value={user.work} onChange={handleInputs}
            />
  
            <input
              name="password"
              type="text"
              value={user.password} onChange={handleInputs}
              autoComplete="off"
              placeholder="Enter you Password"></input>
  
            <input
              name="cpassword"
              type="text"
              value={user.cpassword} onChange={handleInputs}
              autoComplete="off"
              placeholder="Enter you Confirm password"></input>
  
            <input  type="submit" value="Register" onClick={postData} />
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
export default Signup

