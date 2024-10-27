export default function Card_Dashbord(props){
    return(<div className="mb-8 border border-gray-200 rounded-lg shadow-sm  md:mb-12  bg-white  w-[70%] pt-5 ml-10 py-5 h-[250px] ">
        <div className="text-center w-full text-lg font-semibold text-gray-900 mt-5">{props.message } :</div>
        <div className="flex justify-between align-middle mt-5">
            <div>
                <img className="w-[110px] h-[90px]  ml-10 " src={props.img} alt="profile picture" />
            </div>
            <div className="flex flex-col items-center justify-center mr-10">
                <dt className="mb-2 text-3xl font-extrabold">{props.value}</dt>
                <dd className="text-gray-500 font-bold ">{props.speciale}</dd>
            </div>
        </div>
     </div>


    )
}