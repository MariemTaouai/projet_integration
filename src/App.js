import './App.css';
import {Route , Routes} from 'react-router-dom'
import Login from "./Components/Auth/Login"
import DashboardRh from "./Components/Users/RH/DashboardRh"
import DashboardGCommande from './Components/Users/G_commande/DashboardGCommande';
import Employe from './Components/Users/RH/Employe';
import Fournisseur from './Components/Users/RH/Fournisseur';
import PasserComm from './Components/Users/G_Fournisseur/PasserComm';
import Annuler from "./Components/Users/G_Fournisseur/Annuler"
import ConsulterComm from "./Components/Users/G_Fournisseur/ConsulterComm"
import ModifierrrCommande from './Components/Users/G_Fournisseur/ModifierrrCommande';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route extact path="/" element={<Login />}/>
      <Route path="/Dashboard-RH" element={<DashboardRh />}/>
      <Route path ="/Dashboard-commande" element= {<DashboardGCommande/>}/>
      <Route path= "/Employe" element ={<Employe/>}/>
      <Route path= "/Fournisseur" element ={<Fournisseur/>}/>
      <Route path="/PasserComm" element={<PasserComm />} />
      <Route path="/AnnulerComm" element={<Annuler/>} />
      <Route path="/ConsulterComm" element={<ConsulterComm />} />
      <Route path="/modifier/:id" element={<ModifierrrCommande />} />

    </Routes>
    </div>
  );
}

export default App;
