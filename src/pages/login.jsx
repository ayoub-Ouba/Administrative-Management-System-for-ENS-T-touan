import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Poppup_login from "../composers/popup";

import { useState } from "react";

export default function Login(){
    const [user,setuser]=useState("")
    const [password,setpassword]=useState("")
    const [popup,setpopup]=useState(false)
    const [message,setmessage]=useState('')
    const navigate = useNavigate();
    const [dat,setdata]=useState(null)
    const [email_message,setemail_message]=useState("");
    const [password_message,setpassword_message]=useState("");

    function handfunction(){
        console.log(user);
        console.log(password);
        if(user==''){
          setemail_message('Entrer votre email');
      }else if(password==''){
          setemail_message('')
          setpassword_message('Entrer votre password')
      }else{setpassword_message('') ;setemail_message('')
        if(user!="" && password!=""){
          axios.post(`http://localhost:8082/projet/login?username=${user}&password=${password}`, {
           
        }, {
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        }).then((res) =>{ setdata(res.data);
                    if(res.data.status=="200"){
                        localStorage.setItem('username', JSON.stringify(res.data.username));
                        navigate("/admin/dashbord");
                    }else if(res.data.status=="500"){
                      setmessage("Email ou Mot de passe incorrect")
                      setpopup(true)
                    }else{
                      setmessage(res.data)
                      setpopup(true)
                    }
                }
                )

        }
      }
    }
    console.log(dat)

  return (<section className="gradient-form h-[920px] bg-neutral-100 flex justify-center align-middle">
  <div className="container h-full p-10">
    <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 d">
      <div className="w-[90%]">
        <div className="block rounded-lg bg-white shadow-lg :bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap">
            <div className="px-4 md:px-0 lg:w-6/12 h-[700px]">
              <div className="md:mx-6 md:p-12">
                <div className="text-center">
                  <img className="mx-auto w-48" src="src/assets/logo.png" alt="logo" />
                </div>

                <form>
                  <p className="mb-4">Veuillez vous connecter à votre compte</p>

                  <div className="relative mb-4" >
                  <label
                      >Username
                    </label>
                    <input type="text"
                      className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none :text-white :placeholder:text-neutral-300 :autofill:shadow-autofill :peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      placeholder="Username"  onChange={(e)=>{setuser(e.target.value)}}/>
                   <div className='text-red-600 mx-2'>{email_message}</div>
                  </div>

                  <div className="relative mb-4" >
                  <label
                     >Password
                    </label>
                    <input type="password"
                      className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none :text-white :placeholder:text-neutral-300 :autofill:shadow-autofill :peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      placeholder="Password"  onChange={(e)=>{setpassword(e.target.value)}} />
                    <div className='text-red-600 mx-2'>{password_message}</div>
                  </div>

                  <div className='checkbox mb-2 text-center'><input type="checkbox" className="mr-2"/><label >se souvenir de moi</label>  </div>

                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow--3 transition duration-150 ease-in-out hover:shadow--2 focus:shadow--2 focus:outline-none focus:ring-0 active:shadow--2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong
                         bg-[#3858c3]" type="button" onClick={handfunction} > Log in
                    </button>
                    {/* <a href="#!" className="text-gray-500 hover:text-gray-700">Forgot password?</a> */}
                </div>

                </form>
              </div>
            </div>

            <div
              className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"
             >
              <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                <h4 className="mb-6 text-xl font-semibold">
                  We are more than just a company
                </h4>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Poppup_login trigger={popup} message_err={message}  settrigger={setpopup}></Poppup_login>
</section>
  );
}