import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Sidebar(props){
    
    const [pathname, setpathname] = useState("/");
    
    useEffect(() => {
        setpathname(window.location.pathname);
        console.log('La partie de l\'URL après le nom de domaine est :', pathname);
      }, []); 
      
    const Menus = [
        { title: "Dashboard", src: "Chart_fill",url:"/admin/dashbord" },
        { title: "Ajouter Étudiant", src: "User", gap: true ,url:"/addetudiant" },
        { title: "Ajouter  Département  ", src: "Calendar",url:"/addDepartment" },
        { title: "Ajouter  Filière ", src: "Folder",url:"/addfiliere"  },
       
      ];
      const navigate = useNavigate();
      function deconecter(){
        localStorage.clear();
        navigate("/login");

      }
return(<div className={` ${props.open ? "w-72" : "w-20 "} bg-[#3452b7] h-screen p-5  pt-8 relative duration-300 shadow-xl`}>
    <div className="flex gap-x-4 items-center">
        {/* <img src="./src/assets/control.png"className={`cursor-pointer w-7 border-[#2563eb] border-2 rounded-full 
        ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/> */}
        {/* <img src="./src/assets/logo.png" className=" w-[60%] mx-auto"/> */}
        <h1 className={`text-white origin-left font-medium text-[3rem] duration-200 mx-auto ${!props.open && "scale-0"}`}>
             ENS
        </h1>
    </div>
    <ul className="pt-6">
        {Menus.map((Menu, index) => (
            <a href={Menu.url} key={index}><li 
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-md items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                    Menu.url === pathname && "bg-light-white"
                } `}
            >   
                    <img src={`/src/assets/${Menu.src}.png`} />
                    <span className={`${!props.open && "hidden"} origin-left duration-200`}>
                        {Menu.title}
                    </span>
               
            </li> </a>
            
        ))}
        <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-md items-center gap-x-4 `} onClick={deconecter}>   
            <img src={`/src/assets/Setting.png`} />
            <span className={`origin-left duration-200`}>
            Déconnecter
            </span>
        </li>
    </ul>
</div>)
}