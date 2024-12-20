import React, { useState  , useEffect} from "react";
import axios from "axios";
import AddEmp from "./AddEmp";

function Employees() {
    const [view, setView] = useState ("")
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getEmployees"); 
        
        setEmployees(res.data); 
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
  
    useEffect(() => {
      fetchAllEmployees();
    }, []);
 

 const filteredEmployees = employees.filter((employee) =>
  employee.email.toLowerCase().includes(searchTerm.toLowerCase())
);


switch (view) {
  case "addEmp":
    return <AddEmp/>
  default:
    break;
}
    return (
    <div>
      <div className="employees-container">
      
        <h2>Employees List</h2>
        
        <div className="search-bar" style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "200px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>


    <div className="add-employee-button" style={{ marginBottom: "1rem" }}>
          <button
            style={{
              marginLeft : "91%" , 
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}

            onClick={() => setView("addEmp")}
          >
            Add Employee
          </button>
        </div>



        <table className="employees-table">
          <thead>
            <tr>

              <th>E-mail</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/*
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
        <button onClick={addEmployee}>Generate Password & Add Employee</button>
        </div>
        {message && <p>{message}</p>} */}  
    </div>
    );
}


export default Employees;
