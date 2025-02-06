import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { TiPinOutline } from "react-icons/ti";
import { CiCalendarDate } from "react-icons/ci";
import { addNoteApi } from "../../services/Post";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";



interface TextModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}



interface Text_Modal_Interface {
  user:string,
  noteTitle:string,
  description:string
}



  const TextModal: React.FC<TextModalProps> = ({ openModal, setOpenModal   }) => {
    const reduxtStore =  useSelector((state :any)=> state)
    const {id} = reduxtStore?.auth;
  const queryClient = useQueryClient()
  const [noteDataform, setNoteDataform]=useState<Text_Modal_Interface>({user:`${id}`,noteTitle:"",description:""})



  const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNoteDataform(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  


  const addNotesApifun = async (data: Text_Modal_Interface) => {
    try {
      const response = await addNoteApi(data); 
      return response;
    } catch (error) {
      console.error("Error adding note:", error);
      throw new Error("Failed to add note. Please try again.");
    }
  };


  const mutation = useMutation({
    mutationFn: addNotesApifun,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['notes'] });
      console.log('Note added successfully');
      setNoteDataform({user:`${id}`,noteTitle:"",description:""})
      setOpenModal(false);  
    },
    onError: (error: Error) => {
      console.error('Error in mutation:', error.message);
      alert(`Error: ${error.message}`);  
    },
    onSettled: () => {
      console.log('Mutation settled (success or error)');
    },
  });

 
  const handleAddNote = (newNoteData: Text_Modal_Interface) => {
    mutation.mutate(newNoteData);
  };


  return (
    <AlertDialog open={openModal} >
      <AlertDialogTrigger asChild >
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Text Note</AlertDialogTitle>
          <AlertDialogDescription>

          </AlertDialogDescription>
          <div>
            <Input type="text" onChange={formChangeHandler} name="noteTitle" value={noteDataform?.noteTitle||""} placeholder="Text Title.." className="border border-[#c9c7c7] rounded-[3px]" />
            <Textarea  name="description" onChange={formChangeHandler}   value={noteDataform?.description||""} className="mt-2 resize-none min-h-[120px] border border-[#c9c7c7] rounded-[3px] " placeholder="Type your message here." />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center justify-between">
            <div className="flex justify-end py-2 gap-3">

              <Button className="shadow-none p-0 min-h-0 max-h-0"><CiCalendarDate size={30} /></Button>
              <Button className="shadow-none p-0 min-h-0 max-h-0"><TiPinOutline size={30} /></Button>
            </div>

          </div>
          <AlertDialogCancel className="bg-[#286cff] hover:bg-[#4670ca] min-w-23 rounded-[7px] text-white" onClick={() => setOpenModal(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction   disabled={mutation.isPending} className="bg-green-400 min-w-23 hover:bg-green-300 rounded-[7px]" onClick={()=>handleAddNote(noteDataform)}>Save</AlertDialogAction>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TextModal

