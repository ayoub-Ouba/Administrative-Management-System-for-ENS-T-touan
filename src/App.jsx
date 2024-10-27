import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from "./pages/dashbord";
import Add_etudiant from './pages/addetidient';
import Add_departement from './pages/adddepartement';
import Add_filiere from './pages/addfiliere';
import Page_Accueil from './pages/page_accueil';
import Etudiants from './pages/etudiants';
import Departements from './pages/departements';
import Filiers from './pages/filier';




const App = () => {
  return (<>
 
      <Routes>
        <Route path="/" element={<Page_Accueil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashbord" element={<Dashboard />} />
        <Route path="/addetudiant" element={<Add_etudiant />} />
        <Route path="/addDepartment" element={<Add_departement />} />
        <Route path="/addfiliere" element={<Add_filiere />} />
        <Route path="/etudiants" element={<Etudiants />} />
        <Route path="/departements" element={<Departements />} />
        <Route path="/filiers" element={<Filiers />} />
        {/* <Route path="/addDepartment" element={<Blog />} /> */}
    </Routes>
    
    
  
    
    </>
  );
};
export default App;
