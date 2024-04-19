import React, {useState} from "react"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Contact = () => {

  const navigate = useNavigate();

  const verifyPage=async()=>{

    try{
      const res=await fetch('/contact',{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        credentials:"include"
    });
    const data=await res.json();
    console.log(data);
    // setuserData(data);
    if(!res.status===200){
        const err=new Error(res.error);
        throw err;
    }
}catch(err) {
    console.log(err);
    navigate("/login");
}
}

useEffect(()=>{
verifyPage();
},[])




  const [user, setUser] = useState ({
    username:"",email:"",message:""
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
  const {username, email, message} = user;
  const res = await fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username, email, message
    })
  });

  const data = await res.json()
  if (res.status === 422 || !data) {
    window.alert("Invalid crediential")
    console.log("Invalid crediential");
  }else{
    window.alert("submited succesfully")
    console.log("submited succesfully");
    
  }
}


  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57933.369906757114!2d67.09787373486223!3d24.835294514916384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33b07c73d0a7f%3A0xecc47fa378e95fd5!2sKorangi%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2sin!4v1669269265761!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <div className="contact-form" method="POST">
          <form
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={user.name} onChange={handleInputs}
          
              autoComplete="off"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={user.email} onChange={handleInputs}
        
            />

            <textarea
              name="message"
              cols="30"
              rows="10"
          
              value={user.message} onChange={handleInputs}
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" onClick={postData} value="send" />
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
export default Contact;
