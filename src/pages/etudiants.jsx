import React from 'react';
import Navbar from "../composers/nav"
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function Etudiants(){
    const  [filiers, setfiliers] = useState([]);
    const  [departements, setdepartements] = useState([]);
    const  [etudiants, setetudiants] = useState([]);
    const  [loding, setloding] = useState(true);
   
    useEffect(() => {
      axios.get('http://localhost:8082/projet/api/Filiere').then(
        (res1)=>{setfiliers(res1.data)}
        )
        axios.get('http://localhost:8082/projet/api/departements').then(
        (res2)=>{ setdepartements(res2.data)}
        ) 
        axios.get('http://localhost:8082/projet/api/etudiant').then(
            (res3)=>{ setetudiants(res3.data);
                if(Array.isArray(res3.data)){setloding(false)}}
            )
    }, []);
//logique pour pagination 
    const [currentpage,setcurrentpage]=useState(1);
    const [number_etud,setnumber_etud]=useState(7);
    const indexoflasteetud=currentpage*number_etud;
    const indexoffirstetud=indexoflasteetud-number_etud
    var currentetud=etudiants.slice(indexoffirstetud,indexoflasteetud)
    const pagenumber=[]

    function paginate(number){
        setcurrentpage(number)
    }

    for(let i=1;i<Math.ceil(etudiants.length/number_etud)+1;i++){
        pagenumber.push(i);
    }
//search
const  [searchcne, setsearchcne] = useState("");
const [etd,setetd]=useState([]);
const [msg,setmsg]=useState("");

    function search(){
        if(searchcne!=""){
        axios.post(`http://localhost:8082/projet//chercher_etudiant?cne=${searchcne}`).then(
            (res1)=>{if(Array.isArray(res1.data)){setetd(res1.data);setmsg("")}else{setmsg("pas de résultat")}}
            )
        }else{
            setetd([])
            setmsg("")
            currentetud=etudiants.slice(indexoffirstetud,indexoflasteetud)
        }
            
           
    }
    if(etd.length>0){
        currentetud=etd  
    }
   
    console.log(etd)
    console.log(searchcne)
    return(< div className="bg-slate-100 h-screen">
        <Navbar/>
    {loding==false?<div className="container max-w-screen-lg mx-auto  ">

    <div>
      <h2 className="font-semibold text-2xl text-gray-600 mt-10 ">{ 'Étudiants'}</h2>
      <p className="text-gray-500 mb-6"></p>
      <div className="bg-white rounded shadow-lg py-10 px-4 md:p-[1rem] mb-6 h-[600px]">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Détails personnels</p>
          </div>
          <div className="flex justify-end">
            <form className="flex">   
                <label  className="mb-2 text-sm font-medium  sr-only ">Search</label>
                <div className="relative mr-4 w-[250px]">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none pl-2">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" onChange={(e)=>{setsearchcne(e.target.value)}} className="block w-full p-2 ps-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 pl-7  focus:outline-none " placeholder="chercher par CNE.... " required />
                </div>
                <button type="button"  onClick={search} className="text-white mr-5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2  ">Chercher</button>
            </form>
          </div>
            <div className="relative  sm:rounded-lg h-[420px]">
                <table className="text-sm shadow md text-left rtl:text-right text-gray-500 w-[950px]  mx-auto mt-2">
                    <thead className="text-xs text-white uppercase bg-[#3858c3]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                CNE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Prénom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Téléphone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Filiére 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Département
                            </th>
                        </tr>
                    </thead>
                    <tbody>{
                    msg==""?currentetud.map((etd, index) => (
                        <tr className="bg-white border-b :bg-gray-800  hover:bg-gray-50 :hover:bg-gray-600" key={index}>
                            
                            <td className="px-6 py-4">
                            {etd.cne}
                            </td>
                            <td className="px-6 py-4">
                                {etd.nom}
                            </td>
                            <td className="px-6 py-4">
                            {etd.prenom}
                            </td>
                            <td className="px-6 py-4">
                            {etd.telephone}
                            </td>
                            
                            {filiers.map((fil,key3)=>(
                                fil.id==etd.id_filier?
                                <td className="px-6 py-4" key={key3}>
                                {fil.titre}
                            </td>:null
                            ))}
                            
                            {departements.map((dep,key2)=>(
                                dep.id==etd.id_departement?
                                <td className="px-6 py-4" key={key2}>
                                {dep.titre}
                            </td>:null
                            ))}
                        </tr>
                            )):<tr><th></th><th></th><th></th>
                        <th scope="col" className="px-6 py-3">
                            Pas de résultat
                        </th>
                        <th></th><th></th></tr>}
                </tbody>

                
            </table>
           
            </div> 
            <ul className='inline-flex -space-x-px text-sm justify-end mr-5 mt-2 '>
            <li className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-blue-600 border border-white hover:bg-blue-300 hover:text-balck cursor-pointer font-bold" onClick={()=>{if(currentpage>1){setcurrentpage(currentpage-1)}}}>{'<'}</li>

                {pagenumber.map((pgn,key4)=>(
                <li key={key4}>
                 <a onClick={()=>{paginate(pgn)}} className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-blue-600 border border-white hover:bg-blue-300 hover:text-balck">{pgn}</a>
                </li>))}
                <li className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-blue-600 border border-white hover:bg-blue-300 hover:text-balck cursor-pointer font-bold" onClick={()=>{if(currentpage<pagenumber.length){setcurrentpage(currentpage+1)}}}>{'>'}</li>

            </ul >
        </div>
     </div> 
    </div>

    <a  className="md:absolute bottom-0 right-0 p-4 float-right">
      <img src="./src/assets/student.png" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"/>
    </a>

  </div>:<div className='flex justify-center h-[90vh] items-center'> <b>un probleme de data </b>
  <a href='/etudiants'><button  className="text-white ml-5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2  ">loding...</button></a>
</div>}

</div>
)}