import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './modif.css';

function ConsulterComm() {
  const [commandes, setCommandes] = useState([ // Exemple de données de commandes
    { 
      id: '1', 
      produit: 'Produit A', 
      tranche: 'Tranche 1', 
      quantites: [1, 2], 
      status: 'En cours',
      timeline: [
        { tranche: 'Tranche 1', status: 'Commandée', date: '2024-12-01' },
        { tranche: 'Tranche 1', status: 'En cours', date: '2024-12-05' },
      ]
    },
    { 
      id: '2', 
      produit: 'Produit B', 
      tranche: 'Tranche 2', 
      quantites: [3, 4], 
      status: 'Livré',
      timeline: [
        { tranche: 'Tranche 2', status: 'Commandée', date: '2024-11-25' },
        { tranche: 'Tranche 2', status: 'Livré', date: '2024-12-05' },
      ]
    }
  ]);
  const navigate = useNavigate(); 

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
              className="inactive"
            >
              Annuler commande
            </button>
          </div>
          <div className="pContent">
            <button
              onClick={() => navigate('/ConsulterComm')}
              className="active"
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
            onClick={() => navigate('/')} // Déconnexion
            style={{ padding: '0.5em 1em', cursor: 'pointer' }}
          >
            Log Out
          </h4>
        </div>

        <div>
          <h2>Consulter les commandes</h2>
         
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Tranches</th>
                  <th>Quantité</th>
                  <th>Status</th>
                  <th>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((commande) => (
                  <tr key={commande.id}>
                    <td>{commande.produit}</td>
                    <td>{commande.tranche}</td>
                    <td>{commande.quantites.join(', ')}</td>
                    <td>{commande.status}</td>
                    <td>
                      <ul>
                        {commande.timeline.map((event, index) => (
                          <li key={index}>
                            Tranche {event.tranche} - {event.status} ({event.date})
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
        </div>
      </div>
    </div>
  );
}

export default ConsulterComm;
