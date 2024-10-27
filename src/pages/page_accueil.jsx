import "../style/background.css"
import Navbar from "../composers/nav"
export default function Page_Accueil(){
    return(<div>
        <Navbar/>
        <div className="bg-cover bg-no-repeat w-[209.4vh] h-[91.3vh]  background">
            <div className="absoluter bg-[#00000099] w-[209.4vh] h-[91.3vh]">:</div>
        </div>
      </div>
    )
}