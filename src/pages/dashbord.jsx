import { useState,useEffect } from "react";
import axios from "axios";

import { Navigate } from "react-router-dom";

import Sidebar from "../composers/sidebar";
import Card_Dashbord from "../composers/card_dashbord";

export default function Dashboard(){
    const [open, setOpen] = useState(true);
    const [data, setdata] = useState([]);
 
    useEffect(() => {
        axios.get('http://localhost:8082/projet/dashbord').then(
          (res)=>{ setdata(res.data.split(";"))}

          )
         
      }, []); 
      
return(<div className="flex">
    {localStorage.getItem('username')!=null?<>
        <Sidebar open={open}/>
        <div className="h-screen flex-1  ">
            <div className="bg-[#fcfcfc] py-5 flex justify-between shadow-md px-8">
                <img src="/src/assets/sidb.png" className={`w-7 h-7 cursor-pointer
                    ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
                    <div className="flex">
                        <img src="/src/assets/img.png" className="w-9 h-9"/>
                    </div>
            </div>
           <div>
            {data.length>1?
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 h-[840px]">
                <Card_Dashbord message="Nombre des Etudiants" value={data[0]} speciale="Etudiants" img="/src/assets/std.png"/>
                <Card_Dashbord message="Nombre des Départements" value={data[1]} speciale="Départements" img="/src/assets/departement3.png"/>
                <Card_Dashbord message="Nombre des Filiéres" value={data[2]} speciale="Filiéres" img="/src/assets/filier.png"/> 

           </div>
          
           :
           <p>Error 500...</p>} 
            <a  className="md:absolute bottom-0 right-0 p-4 float-right">
           <img src="/src/assets/student.png" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"/>
         </a>
           </div>
            
           
        </div></>
        :<Navigate to="/login" replace={true} />}
    </div>  
)
}