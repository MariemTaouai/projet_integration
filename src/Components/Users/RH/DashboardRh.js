import React, { useEffect, useState } from "react";
import "./DashboardRh.css";
import Employees from "../../../pages/Employees";
import Fournisseur from "../../../pages/Fournisseur";
import HomePageRh from "../../../pages/HomePageRh";
import Logout from "../../Auth/Logout";
import axios from "axios";

function DashboardRh() {
  const [view, setView] = useState("HomePageRh");
  const [countEmployees, setCountEmployees] = useState(0);

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

  const renderContent = () => {
    switch (view) {
      case "employees":
        return <Employees />;
      case "suppliers":
        return <Fournisseur />;
      case "HomePageRh": 
        return <HomePageRh />;
      default:
        return <HomePageRh />;
    }
  };

  const isActive = (button) => view === button ? "active" : "";

  return (
    <div className="wiou">
      <div className="sideBar">
        
        <div className="profile-section">
          <img
            src={`${process.env.PUBLIC_URL}/wiou.png`}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <h4>Jhon Doe</h4>
            <p>Fournisseur</p>
          </div>
        </div>

        <div className="pContent">
          <button onClick={() => setView("HomePageRh")} className={isActive("HomePageRh")}>Home Page</button>
          <button onClick={() => setView("suppliers")} className={isActive("suppliers")}>Fournisseur</button>
          <button onClick={() => setView("employees")} className={isActive("employees")}>Employé</button>
        </div>
      </div>
      <div className="content">
        <div className="woiu">
          <h4 className={isActive("HomePageRh")}>My Profile</h4>
          <Logout />
        </div>
        <div className="stat">
          <div className="card1">
            <h4>Nombre total d'employés</h4>
            <p className="small">{countEmployees}</p>
          </div>
          <div className="card1">
            <h4>Nombre total des fournisseurs</h4>
            <p className="small">5</p>
          </div>
        </div>

        <div className="contents">{renderContent()}</div>
      </div>
    </div>
  );
}

export default DashboardRh;
