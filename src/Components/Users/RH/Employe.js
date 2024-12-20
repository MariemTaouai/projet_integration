import React, { useEffect, useState } from "react";
import "./DashboardRh.css";
import Logout from "../../Auth/Logout";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function Employe() {
  const [countEmployees, setCountEmployees] = useState(0);

  const navigate = useNavigate()
  const countEmp = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/countEmployees");
      setCountEmployees(resp.data.count); 
    } catch (error) {
      console.log("Error counting employees:", error);
    }
  };

  useEffect(() => {
    countEmp();
  }, []);

  

  return (
    <div>
      <div className="wiou">
        <div className="sideBar">
          <div className="pContent">
          <button className="inactive" onClick={() => navigate("/Dashboard-RH")}>Home Page</button>
          <button className="inactive" onClick={() => navigate("/Fournisseur")}>Fournisseur</button>

          </div>
        </div>
        <div className="content">
          <div className="navbar">
            <h4>My Profile</h4>
            <Logout />
          </div>
          <div className="stat">
            <div className="card1">
              <h4>Nombre totale d'employés</h4>
              <p className="small">{countEmployees}</p>
            </div>
            <div className="card1">
              <h4>Nombre totale des fournisseurs</h4>
              <p className="small">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employe;
