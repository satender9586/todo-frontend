import DashboardLayout from "../../common/DashbordLayout/DashboardLayout"
import { TiPin } from "react-icons/ti";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineArchive } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Note_Interface } from "../../constant/TypeNotes";
import { getBinNotesApi } from "../../services/getApi";
import { BsSave2Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { deletePermanetNoteApi,deleteALLPermanetNoteApi } from "../../services/deleteApi";
import { useEffect, useState } from "react";
import { recoverBinNote } from "../../services/getApi";
import { Button } from "../../components/ui/button";











const Trash = () => {

  const reduxtStore = useSelector((state: any) => state.auth)
  const { id } = reduxtStore;
  const [posts, setPosts] = useState([])


  // ------------------------------------FETCH ALL NOTES DATA------------------------------

  const getAllNotesApifun = async (userId: string) => {
    try {
      const response = await getBinNotesApi(userId);
      setPosts(response?.data?.notes)
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };

  // ------------------------------------DELETE SIGNLE NOTES DATA------------------------------
  const deletePermanetNoteHandler = async (ids: string) => {
    try {
      const resposne = await deletePermanetNoteApi(ids)
      if (resposne.status === 200) {
        getAllNotesApifun(id)
      }
    } catch (error) {
      console.log("something is wrong with delete api", error)
    }
  }


  // ------------------------------------RECOVER SIGNLE NOTES DATA------------------------------

  const recoverNotHandler = async (rid: string) => {
    try {
      const response = await recoverBinNote(rid)
      if (response.status === 200) {
        getAllNotesApifun(id)
      }
    } catch (error) {
      console.log("some thing is wroing", error)
    }
  }

  // ------------------------------------RECOVER ALL  NOTES DATA------------------------------

  // ------------------------------------DELETE ALL  NOTES DATA------------------------------

  const deleteALLNotHandler = async (rid: string) => {
    try {
      const response = await deleteALLPermanetNoteApi(rid)
      if (response.status === 200) {
        getAllNotesApifun(id)
      }
    } catch (error) {
      console.log("some thing is wroing", error)
    }
  }


  useEffect(() => {
    if (id) {
      getAllNotesApifun(id)
    }
  }, [id])






  return (
    <DashboardLayout>
      {
        posts.length > 0 && (
          <div className="gap-5 flex">
        
            <Button onClick={()=>deleteALLNotHandler(id)} className="my-5 bg-blue-400 text-white">Delete All</Button>
          </div>
        )
      }

      {
        <div className="w-full  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post: Note_Interface) => (
              <div key={post._id} className="relative group">
                <div
                  style={{ border: `2px solid ${post.noteColor}` }}
                  className="h-[200px] bg-[#ecebeb] p-2 rounded-[10px] transition-all ease-in-out duration-300 transform group-hover:scale-[1.05] group-hover:shadow-xl"
                >
                  <div className="mt-0 w-full bg-white p-1 rounded-[5px] overflow-hidden">
                    <h1 className="text-[14px] font-semibold text-gray-700 truncate">{post.noteTitle}</h1>
                    <textarea
                      disabled
                      className="text-[13px] font-mono text-gray-600 resize-none w-full h-[115px] mt-1 p-1 border border-[#E4E4E4] rounded-[5px] focus:outline-none focus:border-[#A0A0A0] overflow-y-auto"
                      defaultValue={post.description}
                    />
                  </div>
                  <div className="flex justify-between gap-1 mt-2">
                    <button disabled className="opacity-[0.1] shadow-none p-1 rounded-md hover:bg-[#F0F0F0] transition-all duration-200">
                      <IoColorPaletteOutline size={17} />
                    </button>
                    <button disabled className="opacity-[0.1] shadow-none p-2 rounded-md hover:bg-[#FFEBEB] transition-all duration-200">
                      <MdDelete size={17} />
                    </button>
                    <button disabled className="opacity-[0.1] shadow-none p-1 rounded-md hover:bg-[#E3F7FF] transition-all duration-200">
                      <CiEdit size={17} />
                    </button>
                    <button className="opacity-[0.1] shadow-none p-1 rounded-md hover:bg-[#FFF2D9] transition-all duration-200">
                      <CiCalendarDate size={17} />
                    </button>
                    <button disabled className="opacity-[0.1] shadow-none p-1 rounded-md hover:bg-[#FFF2D9] transition-all duration-200">
                      <MdOutlineArchive size={17} />
                    </button>
                    <button disabled className="opacity-[0.1] shadow-none p-1 rounded-md hover:bg-[#E8E8FF] transition-all duration-200">
                      <TiPin size={17} />
                    </button>
                  </div>
                </div>


                <div className="bg-[#f1efef]  absolute top-0 left-0 right-0 bottom-0 rounded-[10px] flex items-center justify-center w-[100%] h-[100%] opacity-0 group-hover:opacity-[0.9] transition-all duration-300 ease-in-out">
                  <div className="flex gap-7 z-20">
                    <button onClick={() => deletePermanetNoteHandler(post._id)} className="text-red-600 hover:text-red-800 transition-all duration-200">
                      <MdDelete size={25} />
                    </button>
                    <button onClick={() => recoverNotHandler(post._id)} className="text-green-600 hover:text-green-800 transition-all duration-200">
                      <BsSave2Fill size={19} />
                    </button>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <div>No notes available</div>
          )}
        </div>

      }

    </DashboardLayout>
  )
}

export default Trash