import { useState } from "react"
import { FiFileText } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import TextModal from "../../components/Modal/TextModal";


const SpeedDial = () => {
 
    const [isSpeedDialHover, setIsSpeedDialHover] = useState(false)
    const [selectSpeedDial, setSelectSpeedDial] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    function selectNotes(id:Number){
        switch(id){
            case  0:
            setOpenModal(true)
            setSelectSpeedDial(0)
            break;
        }
    }



    return (
        <div data-dial-init className="fixed end-6 bottom-6 group">
            <div id="speed-dial-menu-default" className={`flex flex-col items-center mb-4 space-y-2 ${!isSpeedDialHover && "hidden"}`}>
                <div >
                    <button type="button" onClick={()=>selectNotes(0)}  data-tooltip-target="tooltip-copy" data-tooltip-placement="left" className="flex justify-center items-center w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                        <FiFileText size={25} />
                        <span className="sr-only"></span>
                    </button>
                    <div id="tooltip-copy" role="tooltip" className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Copy
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div>
            <button onClick={() => setIsSpeedDialHover(!isSpeedDialHover)} type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-full w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <IoMdAdd size={25} />
                <span className="sr-only">Open actions menu</span>
            </button>
            {
                selectSpeedDial===0 && <TextModal openModal={openModal}  setOpenModal={setOpenModal}/>
            }
           
        </div>
    )
}
export default SpeedDial