import '../style/popup.css'
import {useEffect } from "react";

// animation aos
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Poppup_login(props){
    useEffect(()=>{
        AOS.init({duration:1000})
    },[])
    return (props.trigger)?(<div className='popup' >
        <div className='popup-inner' data-aos="zoom-out-down">
                <p>{props.message_err}</p>
                <button className='close' onClick={()=>{props.settrigger(false)}}>X</button>
                <button className='ok' onClick={()=>{props.settrigger(false)}}>Ok</button>
        </div>
    </div>
    ):null

    
}