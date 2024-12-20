import React, { useState } from 'react'
import './Login.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate();
  const [email , setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const signInEmploye = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/SignInEmploye", { email, password });
      console.log("Response:", response.data);
      
      const { token } = response.data; 
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored successfully.");
      }

      switch (response.data.role) {
        case "RH":
          navigate ("Dashboard-RH")
          break;

          case "gestionnaire des commandes":
            navigate ("Dashboard-commande")
            break;
        default:
          break;
      }

      
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  
  

  return (
    <div className="containerr">
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="signup">
        <form onSubmit={signInEmploye}>
          <label htmlFor="chk" aria-hidden="true" className ="labelLogin">
            Sign in
          </label>
          <input onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" placeholder="Email" required="" />
          <input onChange={(e) => {setPassword(e.target.value)}} type="password" name="pswd" placeholder="Password" required="" />
          <button className = "btn-login" >Confirm</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login