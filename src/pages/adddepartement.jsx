import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";

import Sidebar from "../composers/sidebar";
import Formule_Départemnt from "../composers/Formule_departement";
export default function Add_etudiant(){
    const [open, setOpen] = useState(true);
return(
    <div className="flex">
         {localStorage.getItem('username')!=null?<>
      <Sidebar open={open}/>
      <div className="h-screen flex-1  ">
        <div className="bg-[#ffffff] py-5 flex justify-between shadow-2xl px-8">
            <img src="./src/assets/sidb.png" className={`w-7 h-7 cursor-pointer
                ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
                <div className="flex">
                    
                    <img src="./src/assets/img.png" className="w-9 h-9"/>
                </div>
            </div>
            <Formule_Départemnt/>
      </div></>:<Navigate to="/login" replace={true} />}
    </div>
)
}