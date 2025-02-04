import DashboardLayout from "../../common/DashbordLayout/DashboardLayout";
import SpeedDial from "./SpeedDial";
import { TiPinOutline } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineArchive } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getAllNotesApi } from "../../services/getApi";
import { useQuery } from "@tanstack/react-query";
import { Note_Interface } from "../../constant/TypeNotes";
import { deleteNoteApi } from "../../services/deleteApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateTextModal from "../../components/Modal/UpdateTextModal";
import { useState } from "react";
import { updateNoteApi } from "../../services/putApi";
import { HashColorGenerate } from "../../utils/Functions";
import { useSelector } from "react-redux";
import { store } from "../../redux/Store";




// ------------------------------------FETCH ALL NOTES DATA------------------------------

const getAllNotesApifun = async (userId: string): Promise<Note_Interface[]> => {
    try {
        const response = await getAllNotesApi(userId);
        return response?.data.notes || [];

    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;

    }
};

// ------------------------------------DELETE ALL NOTES BASE ON ID-------------------------
const deleteNoteApifun = async (id: string) => {
    try {
        const response = await deleteNoteApi(id)
        return response
    } catch (error) {
        console.error("Error deleting notes:", error);
        throw error;
    }
}

// -------------------------------------UPDATE NOTE LIKE COLOR------------------------------
interface Note_Update {
    isArchive?: boolean,
    noteColor?: string;
    isPriority?: boolean;
    _id: string;
    user?: string;
    noteTitle?: string;
    description?: string;


}

const updateNoteApiFun = async (data: Note_Update) => {
    try {
        const response = await updateNoteApi(data)
        return response;
    } catch (error) {
        throw error
    }
}



const Dashboard = () => {


    const reduxtStore =  useSelector((state :any)=> state)
    const {id} = reduxtStore?.auth;
    const queryClient = useQueryClient()
    const [isEditModal, setIsEditModal] = useState<boolean>(false)
    const [editModalId, setEditModalId] = useState<string>("")
    const { data: posts, error, isLoading } = useQuery<Note_Interface[], Error>({ queryKey: ['notes'], queryFn: () => getAllNotesApifun(`${id}`) });


    const mutation = useMutation({
        mutationFn: deleteNoteApifun,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            // console.log('Note added successfully');

        },
    });

    const mutationcolor = useMutation({
        mutationFn: updateNoteApiFun,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })


    const deletNoteHandler = (newNoteData: string) => {
        mutation.mutate(newNoteData);
    };
    const noteUpdateHandler = (updateNoteApiFun: Note_Update) => {
        mutationcolor.mutate(updateNoteApiFun)
    }









    return (
        <div>
            <DashboardLayout>
                {
                    error ? (
                        <div>No notes available</div>
                    ) : isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <div className="w-full  grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  gap-2 ">
                            {Array.isArray(posts) && posts.length > 0 ? (
                                posts.filter(note => !note.isArchive).sort((a, b) => (b.isPriority ? 1 : 0) - (a.isPriority ? 1 : 0)).map((post: Note_Interface) => (
                                    <div key={post._id} className="group">
                                        <div style={{ border: `2px solid ${post.noteColor}` }} className="h-[200px] bg-[#ecebeb]  p-2 rounded-[10px] transition-all ease-in-out duration-300 transform group-hover:scale-[1.05] group-hover:shadow-xl">
                                            <div className="mt-0 w-full bg-white p-1 rounded-[5px] overflow-hidden">
                                                <h1 className="text-[14px] font-semibold text-gray-700 truncate">{post.noteTitle}</h1>
                                                <textarea
                                                    disabled
                                                    className="text-[13px] font-mono text-gray-600 resize-none w-full h-[115px] mt-1 p-1 border border-[#E4E4E4] rounded-[5px] focus:outline-none focus:border-[#A0A0A0] overflow-y-auto"
                                                    defaultValue={post.description}
                                                />
                                            </div>
                                            <div className="flex justify-between  gap-1">
                                                <button onClick={() => noteUpdateHandler({ noteColor: HashColorGenerate(), _id: post._id })} className="shadow-none p-1 rounded-md hover:bg-[#F0F0F0]">
                                                    <IoColorPaletteOutline size={17} />
                                                </button>
                                                <button onClick={() => deletNoteHandler(post._id)} className="shadow-none p-2 rounded-md hover:bg-[#FFEBEB]">
                                                    <MdDelete size={17} />
                                                </button>
                                                <button onClick={() => { setEditModalId(post._id), setIsEditModal(true) }} className="shadow-none p-1 rounded-md hover:bg-[#E3F7FF]">
                                                    <CiEdit size={17} />
                                                </button>
                                                <button className="shadow-none p-1 rounded-md hover:bg-[#FFF2D9]">
                                                    <CiCalendarDate size={17} />
                                                </button>
                                                <button onClick={() => noteUpdateHandler({ isArchive: true, _id: post._id })} className="shadow-none p-1 rounded-md hover:bg-[#FFF2D9]">
                                                    <MdOutlineArchive size={17} />
                                                </button>
                                                {
                                                    post.isPriority ? (<button onClick={() => noteUpdateHandler({ isPriority: false, _id: post._id, noteColor: 'defaultColor' })} className="shadow-none p-1 rounded-md hover:bg-[#E8E8FF]">
                                                        <TiPin size={17} />
                                                    </button>) : (<button onClick={() => noteUpdateHandler({ isPriority: true, _id: post._id, noteColor: 'defaultColor' })} className="shadow-none p-1 rounded-md hover:bg-[#E8E8FF]">
                                                        <TiPinOutline size={17} />
                                                    </button>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No notes available</div>
                            )}
                        </div>
                    )
                }
                <SpeedDial />
                {
                    isEditModal && editModalId && <UpdateTextModal openModal={isEditModal} editModalId={editModalId} setEditModalId={setEditModalId} setOpenModal={setIsEditModal} />
                }
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
