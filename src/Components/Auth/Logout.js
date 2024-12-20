import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    console.log("User logged out.");
    
    
    navigate("/");
  };

  return (
    <div>
    
      <h4 onClick={handleLogout} style={{ paddingLeft: '2em', paddingRight: '2em' }}>Logout</h4>
    </div>
  
    
  );
}

export default Logout;
