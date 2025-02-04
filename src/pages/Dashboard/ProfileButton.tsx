import userImg from "../../assets/DashbordLayout/user.png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../utils/Helper";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../../redux/feature/auth/authSlice";

function ProfileButton() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logOut = ()=>{
        deleteAllCookies()
        dispatch(LogoutAction())
    }   
 

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 md:px-6 rounded-full py-3 sm:py-1 sm:bg-none sm:border border-[#E3E5E8] ">
                <img
                    src={userImg}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    alt="user"
                />
                <span className="hidden sm:block font-semibold text-sm text-[#7B7E82] tracking-[0.8px] ">
                    Paytel Finance
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>navigate("/dashboard/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProfileButton;
