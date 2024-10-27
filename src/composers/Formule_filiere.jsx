import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner'
export default function Formule_Filiere(){
  const [titre,settitre]=useState("");
  const [titre_msg,settitre_msg]=useState("");
  const [description,setdescription]=useState("");
  const [descriptionmsg,setdescriptionmsg]=useState("");
  const [msgvalid,setmsgvalid]=useState("");

  function ajouterfunc(){
    if(titre==""){
      settitre_msg("Veuiller Entrer le titre");

    }else if(description==""){
      settitre_msg("");
      setdescriptionmsg("Veuiller Entrer la déscription ");

    }else{
      settitre_msg("");
      setdescriptionmsg("");
      if(titre!="" && description!=""){
      axios.post(`http://localhost:8082/projet/api/Filiere?titre=${titre}&Description=${description}`, {
      }, {headers: {
              'Accept':'application/json',
              'Content-Type':'application/json',
          }
        }).then((res)=>{if(res.data=="valider"){setmsgvalid("la filiére  est bien ajouter");
        settitre("");setdescription("");toast.success("la filiére est bien ajouter")}else{setmsgvalid(res.data)};})
      }
    }
  }
  console.log(msgvalid)
    return(<div className="h-[90.9%] p-6 bg-gray-50 flex items-center justify-center "  >
  <div className="container max-w-screen-lg mx-auto ">
    <div>
    <Toaster richColors position="bottom-right"   />
      <h2 className="font-semibold text-2xl text-gray-600">Ajouter Filiére</h2>
      <p className="text-gray-500 mb-6"></p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 h-[450px]">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Détails </p>
            <p>Veuillez remplir tous les champs.</p>
            {/* <img src="./src/assets/departement2.png" classNameName="mt-7 w-[600px] h-[250px]"/> */}
          </div>

          <div className="lg:col-span-2 mr-9">
          

            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 mt-20 mr-10">

              <div className="md:col-span-5 mb-3">
                <label >Intitulé</label>
                <input type="text" name="intitulé" id="intitulé" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="Deve.."
                 onChange={(e)=>{settitre(e.target.value)}} value={titre} />
                  <div className='text-red-600 mx-2'>{titre_msg}</div>
              </div>

              <div className="md:col-span-5 mb-3">
                <label >Description</label>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="la decription de filiére..."
                 onChange={(e)=>{setdescription(e.target.value)}}  value={description}></textarea>
                  <div className='text-red-600 mx-2'>{descriptionmsg}</div>

              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ajouterfunc}>Submit</button>
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
</div>
    )
}