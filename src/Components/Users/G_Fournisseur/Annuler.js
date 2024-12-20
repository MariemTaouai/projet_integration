import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './modif.css';

function Annuler() { 
  const [commandes, setCommandes] = useState([ 
    { id: '1', produit: 'Produit A', tranche: 'Tranche 1', quantites: [1, 2] },
    { id: '2', produit: 'Produit B', tranche: 'Tranche 2', quantites: [3, 4] },
  ]);
  const navigate = useNavigate(); 

  const handleDeleteCommande = (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande?");
    if (confirmDelete) {
      setCommandes(commandes.filter(commande => commande.id !== id));
    }
  };

  const handleModifyCommande = (id) => {
    navigate(`/modifier/${id}`); 
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
              className="inactive"
            >
              Passer commande
            </button>
          </div>
          <div className="pContent">
            <button
              onClick={() => navigate('/AnnulerComm')}
              className="active"
            >
              Annuler commande
            </button>
          </div>
          <div className="pContent">
            <button
              onClick={() => navigate('/ConsulterComm')}
              className="inactive"
            >
              Consulter Commande
            </button>
          </div>
        </div>
      </div>

      <div className="m">
        <div className="woiu">
          <h4
            onClick={() => navigate('/PasserComm')} // Aller au profil utilisateur
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
          <h2>Annuler une commande</h2>
          {commandes.length === 0 ? (
            <p>Aucune commande à afficher.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Tranches</th>
                  <th>Quantité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((commande) => (
                  <tr key={commande.id}>
                    <td>{commande.produit}</td>
                    <td>{commande.tranche}</td>
                    <td>{commande.quantites.join(', ')}</td>
                    <td>
                     
                      <button class ="supp" onClick={() => handleDeleteCommande(commande.id)}>
                        Supprimer
                      </button>
                      <button class ="modif"onClick={() => handleModifyCommande(commande.id)}>
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Annuler; 