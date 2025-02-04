
import { FaRegBell } from "react-icons/fa6";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

function Notificaiton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
            <FaRegBell className="text-[#7B7E82]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
               
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Notificaiton;
