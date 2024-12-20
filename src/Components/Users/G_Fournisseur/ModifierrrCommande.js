import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './modif.css';

function ModifierrrCommande() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [commande, setCommande] = useState(null);
  const [selectedButton, setSelectedButton] = useState('passer');

  useEffect(() => {

    const commandes = [
      {
        id: 1,
        produit: 'Produit A',
        tranche: 2,
        quantites: [10, 20],
      },
      {
        id: 2,
        produit: 'Produit B',
        tranche: 1,
        quantites: [5],
      },
    ];

    const selectedCommande = commandes.find((cmd) => cmd.id === parseInt(id));
    if (selectedCommande) {
      setCommande(selectedCommande);
    } else {
      alert('Commande introuvable');
      navigate('/'); 
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCommande((prevCommande) => ({
      ...prevCommande,
      [name]: name === 'tranche' ? parseInt(value) : value,
    }));
  };

  const handleQuantiteChange = (index, value) => {
    if (!commande) return;
    const newQuantites = [...commande.quantites];
    newQuantites[index] = parseInt(value) || 0;

    setCommande((prevCommande) => ({
      ...prevCommande,
      quantites: newQuantites,
    }));
  };

  const handleSave = () => {
    if (!commande) return;
    console.log('Commande mise à jour :', commande);
    alert('Commande modifiée avec succès');
    navigate('/PasserComm'); 
  };

  if (!commande) {
    return <div>Chargement des données de la commande...</div>;
  }

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
      onClick={() => navigate('/PasserComm', { state: { action: 'passer' } })}
      className={selectedButton === 'passer' ? 'active' : 'inactive'}
            >
              Passer commande
            </button>
          </div>
          <div className="pContent">
            <button
      onClick={() => navigate('/AnnulerComm', { state: { action: 'passer' } })}
      className={selectedButton === 'annuler' ? 'active' : 'inactive'}
            >
              Annuler commande
            </button>
          </div>
          <div className="pContent">
            <button
      onClick={() => navigate('/ConsulterComm', { state: { action: 'passer' } })}
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
        <div style={{ padding: '20px' }}>
          <h2>Modifier la commande #{id}</h2>
          <form>
            <div className="form-group">
              <label>Produit</label>
              <input
                type="text"
                name="produit"
                value={commande.produit || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Nombre de tranches</label>
              <input
                type="number"
                name="tranche"
                value={commande.tranche || 1}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Quantités par tranche</label>
              {commande.quantites.map((quantite, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <label>Tranche {index + 1} :</label>
                  <input
                    type="number"
                    value={quantite || 0}
                    onChange={(e) => handleQuantiteChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button type="button" onClick={handleSave} style={{ marginTop: '20px' }}>
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifierrrCommande;
