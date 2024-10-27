import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner'
export default function Formule_Départemnt(){
  const [chef_departement,setchefdepartement]=useState("");
  const [chef_departement_msg,setchef_departement_msg]=useState("");
  const [intitule,setintitule]=useState("");
  const [intitulemsg,setintitulemsg]=useState("");
  const [msgvalid,setmsgvalid]=useState("");

  function ajouterfunc(){
    if(chef_departement==""){
      setchef_departement_msg("Veuiller Entrer le chef Département");

    }else if(intitule==""){
      setchef_departement_msg("");
      setintitulemsg("Veuiller Entrer l'intitulé ");

    }else{
      setchef_departement_msg("");
      setintitulemsg("");
      if(chef_departement!="" && intitule!=""){
      axios.post(`http://localhost:8082/projet/api/departements?intitulé=${intitule}&chef_departement=${chef_departement}`, {
      }, {headers: {
              'Accept':'application/json',
              'Content-Type':'application/json',
          }
        }).then((res)=>{if(res.data=="valider"){setmsgvalid("le Département est bien ajouter");
        setchefdepartement("");setintitule("");toast.success("le Département est bien ajouter")}else{setmsgvalid(res.data)};})
      }
    }
  }
  console.log(msgvalid)

    return(<div className="h-[90.9%] p-6 bg-gray-50 flex items-center justify-center "  >
  <div className="container max-w-screen-lg mx-auto ">
    <div>
    <Toaster richColors position="bottom-right"   />
      <h2 className="font-semibold text-2xl text-gray-600">Ajouter Département</h2>
      <p className="text-gray-500 mb-6"></p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 h-[450px]">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Détails</p>
            <p>Veuillez remplir tous les champs.</p>
            <img src="./src/assets/departement2.png" className="mt-7 w-[600px] h-[250px]"/>
          </div>

          <div className="lg:col-span-2 mr-9">
        <form >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-20 mr-10">
         
            <div className="md:col-span-5 mb-3">
                <label>Chéf Département</label>
                <input type="text" name="chef_departement" id="chef_departement" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="Mr..." 
                onChange={(e)=>{setchefdepartement(e.target.value)}} value={chef_departement}/>
                 <div className='text-red-600 mx-2'>{chef_departement_msg}</div>
              </div>

              <div className="md:col-span-5 mb-3">
                <label>Intitulé</label>
                <input type="text" name="Intitulé" id="Intitulé" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="Log..."
                onChange={(e)=>{setintitule(e.target.value)}}  value={intitule}/>
                 <div className='text-red-600 mx-2'>{intitulemsg}</div>
              </div>
              
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={ajouterfunc}>Submit</button>
                </div>
              </div>
             

            </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <a  className="md:absolute bottom-0 right-0 p-4 float-right">
      <img src="./src/assets/student.png" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"/>
    </a>
  </div>
</div>
    )
}