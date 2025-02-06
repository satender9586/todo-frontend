import { Button } from "../../components/ui/button"
import todoImg from "./../../assets/Common/Navbar/todo.png"
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbaar = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full min-h-[60px] shadow-sm border-b border-b-[#EAEAEA]">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2">
                    <div>
                        <div className="max-w-[30px] ">
                            <img src={todoImg} alt="to-img" className="w-[35px]" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-5 sm:px-0 md:px-4 ">
                        <ul className="hidden sm:flex gap-5">
                            <li className="text-[18px] font-[400]"><Button onClick={()=> navigate("/")} className="text-[18px] font-[400] px-0 py-0 min-h-0 max-h-0">Home</Button>  </li>
                            <li className="text-[18px] font-[400]">About</li>
                            <li className="text-[18px] font-[400]">Faq</li>
                        </ul>
                        <div className="flex items-center gap-3">
                            <Button onClick={()=> navigate("/login")} className="hidden sm:flex shadow-none  bg-green-400 hover:bg-green-500 rounded-full  items-center justify-center">Login</Button>
                            <Button onClick={()=> navigate("/register")} className="hidden sm:block  bg-black text-white  hover:bg-black  rounded-full px-5">Register</Button>
                        </div>
                        <div className="sm:hidden">
                            <Button    className="p-0 min-h-0 max-h-0"><IoMenuOutline /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbaar

