import instence from "../config/Axios";
const COMMON_NOTE_PATH = '/note';



interface Note_Response {
    data: any; 
    status: number;
    statusText: string;
  }
  


export const deleteNoteApi = async (id:string):Promise<Note_Response>=>{
    const response = await instence.delete(`${COMMON_NOTE_PATH}/delete-note/${id}`)
    console.log("response",response)
    if(response.status==200){
        return response
    } else{
        throw new Error("Something went wrong with the get notes API!")
    }
}
   


export const deletePermanetNoteApi = async (id:string):Promise<Note_Response>=>{
    const response = await instence.delete(`${COMMON_NOTE_PATH}/pemanent-delete/${id}`)
    console.log("response",response)
    if(response.status==200){
        return response
    } else{
        throw new Error("Something went wrong with the get notes API!")
    }
}


export const deleteALLPermanetNoteApi = async (id:string):Promise<Note_Response>=>{
    const response = await instence.delete(`${COMMON_NOTE_PATH}/pemanentall-delete/${id}`)
    console.log("response",response)
    if(response.status==200){
        return response
    } else{
        throw new Error("Something went wrong with the get notes API!")
    }
}
   
