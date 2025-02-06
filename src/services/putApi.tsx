import instence from "../config/Axios";
const COMMON_NOTE_PATH = '/note';
const Auth_PATH = '/auth';

interface update_Interface {
    _id : string,
    noteTitle?: string,
    description?:string,
    isPriority?:boolean,
    noteColor?:string,
    user?: string,
    isArchive?:boolean

}


interface Note_Response {
    data: any; 
    status: number;
    statusText: string;
}


  


export const updateNoteApi = async (data:update_Interface):Promise<Note_Response>=>{
    const response = await instence.put(`${COMMON_NOTE_PATH}/update-note`,data)
    if(response.status==200){
        return response
    } else{
        throw new Error("Something went wrong with the get notes API!")
    }
}
   
export const uploadFileApi = async (data:any):Promise<Note_Response>=>{
    const response = await instence.put(`${Auth_PATH}/upload-profile`,data,{
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout:10000
    })
    if(response.status==200){
        return response
    } else{
        throw new Error("Something went wrong upload Image!")
    }
}
   
