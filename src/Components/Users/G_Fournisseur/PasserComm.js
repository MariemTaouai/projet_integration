import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './modif.css';

function PasserComm() {
  const [formData, setFormData] = useState({
   
      produit: '',
      tranche: '',
      quantites: [],
 
    
  });
  const [selectedButton, setSelectedButton] = useState('passer'); 

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'tranche') {
      const newTranche = parseInt(value, 10);
      if (!isNaN(newTranche)) {
        const newQuantites = Array(newTranche).fill(0); // Crée un tableau avec des zéros
        setFormData({ ...formData, tranche: newTranche, quantites: newQuantites });
      }
    } else if (name === 'quantiteUnique') {
      const newQuantites = [parseInt(value, 10) || 0];
      setFormData({ ...formData, quantites: newQuantites });
    } else if (name.startsWith('quantite')) {
      const index = parseInt(name.replace('quantite', ''), 10) - 1;
      const newQuantites = [...formData.quantites];
      newQuantites[index] = parseInt(value, 10) || 0;
      setFormData({ ...formData, quantites: newQuantites });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.produit && formData.tranche && formData.quantites.every(q => q > 0)) {
      console.log('Commande passée :', formData);
      alert('Commande passée avec succès');
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  };
  

  return (
    <div className="wiou">
      <div className="p">
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

        <div className="button-group">
          <div className="pContent">
            <button
            onClick={() => navigate('/PasserComm')}
            className={selectedButton === 'passer' ? 'active' : 'inactive'}
            >
              Passer commande
            </button>
          </div>
          <div className="pContent">
            <button
            onClick={() => navigate('/AnnulerComm')}
            className={selectedButton === 'annuler' ? 'active' : 'inactive'}
            >
              Annuler commande
            </button>
          </div>
          <div className="pContent">
            <button
            onClick={() => navigate('/ConsulterComm')}
              className={selectedButton === 'consulter' ? 'active' : 'inactive'}
            >
              Consulter Commande
            </button>
          </div>
        </div>
      </div>

      <div className="m">
        <div className="woiu">
          <h4
            onClick={() => navigate('/PasserComm')}
            style={{ cursor: 'pointer', padding: '0.5em 1em' }}
          >
            My Profile
          </h4>
          <h4
            onClick={() => navigate('/')}
            style={{ padding: '0.5em 1em', cursor: 'pointer' }}
          >
            Log Out
          </h4>
        </div>

        <div>
          <h2>Passer une commande</h2>
          <form onSubmit={handleSubmit}>
  <div>
    <label>Produit :</label>
    <input
      type="text"
      name="produit"
      value={formData.produit}
      onChange={handleInputChange}
      required
    />
  </div>
  <div>
    <label>Nombre de tranches :</label>
    <input
      type="number"
      name="tranche"
      value={formData.tranche}
      onChange={handleInputChange}
      min="1"
      required
    />
  </div>
  {formData.tranche === 1 ? (
    <div>
      <label>Quantité :</label>
      <input
        type="number"
        name="quantiteUnique"
        value={formData.quantites[0] || ''}
        onChange={handleInputChange}
        required
      />
    </div>
  ) : (
    formData.quantites.map((quantite, index) => (
      <div key={index}>
        <label>Quantité pour tranche {index + 1} :</label>
        <input
          type="number"
          name={`quantite${index + 1}`}
          value={quantite || ''}
          onChange={handleInputChange}
          required
        />
      </div>
    ))
  )}
  <button type="submit">Passer la commande</button>
</form>

        </div>
      </div>
    </div>
  );
}

export default PasserComm;
