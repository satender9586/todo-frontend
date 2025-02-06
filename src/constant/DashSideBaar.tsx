import { CiBellOn } from "react-icons/ci";
import { GoLightBulb } from "react-icons/go";
import { MdOutlineArchive } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { CiUser } from "react-icons/ci";


interface sideBaarData_interface{
    id:number,
    icons:JSX.Element,
    tabName:string,
    tabPath:string
}

export const sideBaarData: sideBaarData_interface[] = [
    {
        id: 1,
        icons: <GoLightBulb className="h-4 w-4 text-gray-700 hover:text-white transition-all duration-300 ease-in-out"/>,
        tabName: "Notes",
        tabPath: "/dashboard"
    },
    {
        id: 2,
        icons: <CiBellOn className="h-4 w-4 text-gray-700 hover:text-white transition-all duration-300 ease-in-out"/>,
        tabName: "Reminder",
        tabPath: "/dashboard/remind"
    },
    {
        id: 3,
        icons: <MdOutlineArchive className="h-4 w-4 text-gray-700 hover:text-white transition-all duration-300 ease-in-out"/>,
        tabName: "Archive",
        tabPath: "/dashboard/isachive"
    },
    {
        id: 4,
        icons: <CiTrash className="h-4 w-4 text-gray-700 hover:text-white transition-all duration-300 ease-in-out"/>,
        tabName: "Trash",
        tabPath: "/dashboard/trash  "
    },
    {
        id: 2,
        icons: <CiUser className="h-4 w-4 text-gray-700 hover:text-white transition-all duration-300 ease-in-out"/>,
        tabName: "Profiles",
        tabPath: "/dashboard/profile"
    }
];

