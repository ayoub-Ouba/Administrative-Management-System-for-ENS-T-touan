import React from 'react';
import Navbar from "../composers/nav"
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function Departements(){
    const  [filiers, setfiliers] = useState([]);
    const  [departements, setdepartements] = useState([]);
    // const  [etudiants, setetudiants] = useState([]);
    const  [loding, setloding] = useState(true);
   
    useEffect(() => {
        axios.get('http://localhost:8082/projet/api/departements').then(
        (res2)=>{ setdepartements(res2.data);if(Array.isArray(res2.data)){setloding(false)}}
        ) 
    }, []);
//logique pour pagination 
    const [currentpage,setcurrentpage]=useState(1);
    const [number_etud,setnumber_etud]=useState(7);
    const indexoflasteetud=currentpage*number_etud;
    const indexoffirstetud=indexoflasteetud-number_etud
    var currentetud=departements.slice(indexoffirstetud,indexoflasteetud)
    const pagenumber=[]

    function paginate(number){
        setcurrentpage(number)
    }

    for(let i=1;i<Math.ceil(departements.length/number_etud)+1;i++){
        pagenumber.push(i);
    }
//search
// const  [searchcne, setsearchcne] = useState("");
// const [etd,setetd]=useState([]);
// const [msg,setmsg]=useState("");

    // function search(){
    //     if(searchcne!=""){
    //     axios.post(`http://localhost:8082/projet//chercher_etudiant?cne=${searchcne}`).then(
    //         (res1)=>{if(Array.isArray(res1.data)){setetd(res1.data);setmsg("")}else{setmsg("pas de résultat")}}
    //         )
    //     }else{
    //         setetd([])
    //         setmsg("")
    //         currentetud=etudiants.slice(indexoffirstetud,indexoflasteetud)
    //     }
            
           
    // }
    // if(etd.length>0){
    //     currentetud=etd  
    // }
   
   
    return(< div className="bg-slate-100 h-screen">
        <Navbar/>
    {loding==false?<div className="container max-w-screen-lg mx-auto  ">

    <div>
      <h2 className="font-semibold text-2xl text-gray-600 mt-10 ">{ 'Départements'}</h2>
      <p className="text-gray-500 mb-6"></p>
      <div className="bg-white rounded shadow-lg py-10 px-4 md:p-[1rem] mb-6 h-[600px]">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
          <div className="text-gray-600">
            <p className="font-medium text-lg mb-10">Liste des Départements </p>
          </div>
            <div className="relative  sm:rounded-lg ">
                <table className="text-sm shadow md text-left rtl:text-right text-gray-500 w-[950px]  mx-auto mt-2">
                    <thead className="text-xs text-white uppercase bg-[#3858c3]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                intituler
                            </th>
                            <th scope="col" className="px-6 py-3">
                                chef departement
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>{
                   currentetud.map((dep, index) => (
                        <tr className="bg-white border-b :bg-gray-800  hover:bg-gray-50 :hover:bg-gray-600" key={index}>
                            
                            <td className="px-6 py-4">
                            {dep.id}
                            </td>
                            <td className="px-6 py-4">
                                {dep.titre}
                            </td>
                            <td className="px-6 py-4">
                            {dep.chef_departement}
                            </td>
                        </tr>
                            ))}
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