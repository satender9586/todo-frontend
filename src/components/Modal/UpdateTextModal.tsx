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
  import { useMutation, useQueryClient,useQuery} from "@tanstack/react-query";
  import { useEffect, useState } from "react";
  import { getSingleNoteById } from "../../services/getApi";
  import { updateNoteApi } from "../../services/putApi";
  
  
  
  interface TextModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    editModalId:string,
    setEditModalId:(editModalId:string)=>void;
  }
  
  
  
  interface Text_Modal_Interface {
    _id:string,
    noteTitle:string,
    description:string
  }
  
  


  interface SingleApi_Note_Interface {
    description:string,
    noteTitle: string,
    _id :string
  }

  
  const getSingleNotesApifun = async (noteId: string): Promise<SingleApi_Note_Interface[]> => {
    try {
      const response = await getSingleNoteById(noteId);
      return [response?.data?.note]; 
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };
  
  
  
    const UpdateTextModal: React.FC<TextModalProps> = ({editModalId, openModal, setOpenModal,setEditModalId   }) => {

    const queryClient = useQueryClient()
    const [noteDataform, setNoteDataform]=useState<Text_Modal_Interface>({_id:"678109e2533dd40ea7bf012d",noteTitle:"",description:""})

  


  
    const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setNoteDataform(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    
  
  
    const addNotesApifun = async (data: Text_Modal_Interface) => {
      try {
        const response = await updateNoteApi(data); 
        return response;
      } catch (error) {
        console.error("Error adding note:", error);
        throw new Error("Failed to add note. Please try again.");
      }
    };
  
  
    const mutation = useMutation({
      mutationFn: addNotesApifun,
      onSuccess: () => {
        console.log('Note Updated successfully');
        setEditModalId("")
        setNoteDataform({_id:"",noteTitle:"",description:""})
        setOpenModal(false);  
        queryClient.invalidateQueries({ queryKey: ['notes'] });
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

      
   

  

    const { data } = useQuery<SingleApi_Note_Interface[], Error>({
      queryKey: ['notesingle'],
      queryFn: () => getSingleNotesApifun(editModalId)
    });



    useEffect(()=>{
      if(data){
        setNoteDataform({...noteDataform,_id:data[0]?._id,noteTitle:data[0]?.noteTitle,description:data[0]?.description})
      }
    },[data])
















    return (
      <AlertDialog open={openModal} >
        <AlertDialogTrigger asChild >
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white ">
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
             
  
            </div>
            <AlertDialogCancel className="bg-[#286cff] hover:bg-[#4670ca] min-w-23 rounded-[7px] text-white" onClick={() => setOpenModal(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction   disabled={mutation.isPending} className="bg-green-400 min-w-23 hover:bg-green-300 rounded-[7px]" onClick={()=>handleAddNote(noteDataform)}>Update</AlertDialogAction>
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default UpdateTextModal
  
  