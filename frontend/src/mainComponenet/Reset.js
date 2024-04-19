import React from 'react'
import styled from "styled-components";

import { useState } from 'react';


const Reset = () => {


    const [email, setEmail] = useState("")

  
    const ResetUser = async (e) => {
      e.preventDefault();
     
      const res = await fetch("/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
    
      const data = await res.json()
      if (res.status === 422 || !data) {
        window.alert("Email is Not Register")
        console.log("Email is Not Register");
      }else{

        window.alert("Please Check Your Gmail")
        console.log("Please Check Your Gmail");
      }
    }
  


 
return (
  <Wrapper>
    <h2 className="common-heading">ForgotPassword</h2>

    <div className="container">
      <div className="contact-form" method="POST">
        <form
          method="POST"
          className="contact-inputs">

          <input
            type="email"
            name="email"
            placeholder="Enter you Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
      
          />

       

          <input type="submit" onClick={ResetUser} value="Login" />
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
export default Reset
