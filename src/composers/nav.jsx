export default function Navbar(){
    const liens=[{url:"/",content:"Home"},{url:"/etudiants",content:"Etudiants"},{url:"/departements",content:"Départements"},{url:"filiers",content:"Filiéres"},{url:"/login",content:"Administration"}]

    return(<nav className="bg-white border-gray-200 dark:bg-white shadow-md">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto  ">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
      <img src="src/assets/logo3.png" className="h-[5rem] w-[10rem]" alt="Flowbite Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white uppercase"> anuuaire ens  </span> */}
      </a>
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-white dark:border-gray-700">
          {liens.map((l,i)=>(
               <li key={i}>
               <a href={l.url} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-[#3858c3] md:p-0" aria-current="page">{l.content}</a>
             </li>))}
        </ul>
      </div>
    </div>
  </nav>)

}