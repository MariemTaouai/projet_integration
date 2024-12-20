import React , {useState} from 'react'
import axios from "axios"
import "./AddEmp.css"
function AddEmp() {

   const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
  
    const addEmployee = async () => {
      try {
        const response = await axios.post("http://localhost:5000/addingEmp", { email, role });
        setMessage(response.data.msg);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.msg);
        } else {
          setMessage("Error adding employee.");
        }
    }
    };


  return (
    <div> 
      <h2>Add Employee</h2>
        <div>
        <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" disabled>
            Select Role
            </option>
            <option value="RH">RH</option>
            <option value="gestionnaire des commandes">gestionnaire des commandes</option>
        </select>
        <button  class="gen"onClick={addEmployee}>Generate Password & Add Employee</button>
        </div>
        {message && <p>{message}</p>} </div>
  )
}

export default AddEmp