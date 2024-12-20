import React, { useState, useEffect } from "react";
import axios from "axios";
function HomePageRh() {
    const [employees, setEmployees] = useState([]);

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
  
    return (
      <div className="employees-container">
        <h2>Employees List</h2>
        <table className="employees-table">
          <thead>
            <tr>
            
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
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
    );
}

export default HomePageRh