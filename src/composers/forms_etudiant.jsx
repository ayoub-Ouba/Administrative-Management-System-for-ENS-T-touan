import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';

import { Toaster, toast } from 'sonner'


export default function Formule_Etudiant(){

  const  [filiers, setfiliers] = useState([]);
  const  [departements, setdepartements] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8082/projet/api/Filiere').then(
      (res)=>{setfiliers(res.data)}
      )
      axios.get('http://localhost:8082/projet/api/departements').then(
      (res)=>{ setdepartements(res.data)}
      )
  }, []);
  
  

  const [cne,setcne]=useState("");
  const [cne_msg,setcne_msg]=useState("");
  const [nom,setnom]=useState("");
  const [prenom,setprenom]=useState("");
  const [nom_prenommsg,setnom_prenommsg]=useState("");
  const [tele,settele]=useState("");
  const [telemsg,settelemsg]=useState("");
  const [departement,setdepartement]=useState("");
  const [filier,setfilier]=useState("");
  const [departement_filiermsg,setdepartement_filiermsg]=useState("");
  const [msgvalid,setmsgvalid]=useState("");
  
  function ajouterfunc(){
    if(nom=="" || prenom==""){
      setnom_prenommsg("Veuiller Entrer le nom et le prenom");
    }else if(cne==""){
      setnom_prenommsg("");
      setcne_msg("Veuiller Entrer le CNE ");

    }else if(cne!="" && cne.length<10){
      setcne_msg("Le CNE  est invalide ");
    }
    else if(tele==""){
      setcne_msg("")
      settelemsg("Veuiller Entrer le Numéro de téléphone ")
    }
    else if(tele!="" && tele.length<10){
      settelemsg("Le Numéro de téléphone  est invalide ");
    }
    else if(departement==""||filier==""  ){
     settelemsg("")
      setdepartement_filiermsg("Veuiller choisir le département et la filier d'étudiant")
    }
    else{
      setnom_prenommsg(""); setcne_msg(" ");setdepartement_filiermsg("");settelemsg("")
      if(cne!="" && nom!="" && prenom!="" && tele!=""&& departement!="" && filier!=""){
      axios.post(`http://localhost:8082/projet/api/etudiant?CNE=${cne}&Nom=${nom}&prenom=${prenom}&telephone=${tele}&id_filier=${filier}&id_departement=${departement}`, {
      }, {headers: {
              'Accept':'application/json',
              'Content-Type':'application/json',
          }
        }).then((res)=>{
          if(res.data=="valider"){
            setprenom("");settele("");setdepartement("");setfilier("")
            setdepartement("");setcne("");setnom("")
            setmsgvalid("l'étudiant  est bien ajouter"); 
              toast.success("l'étudiant est bien ajouter")
          }
          else{setmsgvalid(res.data);}console.log(res)
     
        })
      }
    }
  }


    return(<div className="h-[90.9%] p-6 bg-gray-50 flex items-center justify-center  "  >
       {filiers.length > 0 ?
      
  <div className="container max-w-screen-lg mx-auto ">
    <Toaster richColors position="bottom-right"   />
    <div>
      <h2 className="font-semibold text-2xl text-gray-600">{'Ajouter Étudiant'}</h2>
      <p className="text-gray-500 mb-6"></p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 h-[600px]">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Détails personnels</p>
            <p>Veuillez remplir tous les champs.</p>
          </div>

          <div className="lg:col-span-2 mr-9">
          

            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-20 mr-10">
                <div className="md:col-span-3">
                  
                    <label>Nom </label>
                    <input type="text" name="Nom" id="Nom" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="N..." 
                    onChange={(e)=>{setnom(e.target.value)}} value={nom}/>
                    <div className='text-red-600 mx-2'>{nom_prenommsg}</div>
                </div>
                

              <div className="md:col-span-2 mb-2">
                <label >Prénom</label>
                <input type="text" name="Prenom" id="Prenom" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="P..."
                 onChange={(e)=>{setprenom(e.target.value)}} value={prenom} />
              </div>


              <div className="md:col-span-5 mb-2">
                <label>CNE</label>
                <input type="text" name="cne" id="cne" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="M1..."
                 onChange={(e)=>{setcne(e.target.value)}} value={cne} maxLength={10}/>
                 {msgvalid=="invalid cne"?<div className='text-red-600 mx-2'>le cne invalide</div>:msgvalid=="CNE déja trouver"?<div className='text-red-600 mx-2'>le cne déja trouver</div>:null}
                 <div className='text-red-600 mx-2'>{cne_msg}</div>
              </div>
              

              <div className="md:col-span-5 mb-2">
                <label >Téléphone</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="+212...."
                 onChange={(e)=>{settele(e.target.value)}} value={tele} maxLength={10}/>
                 {msgvalid=="invalid telephone"?<div className='text-red-600 mx-2'>le numero téléphone doit étre juste des chiffres</div>:null}
                 <div className='text-red-600 mx-2'>{telemsg}</div>
              </div>
              

              <div className="md:col-span-3">
                <label >Département  </label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 onChange={(e)=>{setdepartement(e.target.value)}} value={departement}>
                    <option selected value="">Choisir Département</option>
                    {
                    departements.map((departement, index) => (
                      <option key={index} value={departement.id}>{departement.titre}</option>
                    )) }
                   
                  </select>
                  <div className='text-red-600 mx-2'>{departement_filiermsg}</div>
                  

              </div>
              <div className="md:col-span-2 mb-2">
                <label >Filiére  </label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                 onChange={(e)=>{setfilier(e.target.value)}} value={filier}>
                <option selected value="">Choisir Filiére </option>
                {
                    filiers.map((filiére, index) => (
                      <option key={index} value={filiére.id}>{filiére.titre}</option>
                    )) }
                    
                </select>
              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Submit</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <a  className="md:absolute bottom-0 right-0 p-4 float-right">
      <img src="./src/assets/student.png" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"/>
    </a>
  </div>
  : <div>lodiing ..</div>
  
  
}
</div>
    )
}