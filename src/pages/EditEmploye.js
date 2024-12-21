import React, { useEffect, useState } from "react";
import "./DashboardRh.css";
import Employees from "./Employees";
import Fournisseur from "./Fournisseur";
import HomePageRh from "./HomePageRh";
import Logout from "../Auth/Logout";
import axios from "axios";


function EditEmploye() {
  const [view, setView] = useState("HomePageRh");
  const [countEmployees, setCountEmployees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employe, setEmploye] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateDebutContrat: "",
    dateFinContrat: "",
    Role: ""
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmploye({ ...employe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/updateEmployee/${employe.id}`, employe);
      setLoading(false);
      alert("Employé modifié avec succès !");
    } catch (error) {
      setLoading(false);
      setErrorMessage("Erreur lors de la modification de l'employé.");
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/deleteEmployee/${employe.id}`);
      setLoading(false);
      alert("Employé supprimé avec succès !");
    } catch (error) {
      setLoading(false);
      setErrorMessage("Erreur lors de la suppression de l'employé.");
      console.error("Error deleting employee:", error);
    }
  };

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
            <p>RH</p>
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

        <div className="add-commande-container">
          <h2>Modifier Employé</h2>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="add-commande-form">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                value={employe.nom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={employe.prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={employe.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="text"
                name="telephone"
                value={employe.telephone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date début contrat</label>
              <input
                type="date"
                name="dateDebutContrat"
                value={employe.dateDebutContrat}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date fin contrat</label>
              <input
                type="date"
                name="dateFinContrat"
                value={employe.dateFinContrat}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="Role"
                value={employe.Role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Mise à jour en cours...' : 'Modifier'}
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
                disabled={loading}
              >
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmploye;
