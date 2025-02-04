import instence from "../config/Axios"; 
const COMMON_NOTE_PATH = '/note';
const Auth_PATH = '/auth';


interface Note_Response {
  data: any; 
  status: number;
  statusText: string;
}


export const getAllNotesApi = async (id: string): Promise<Note_Response> => {
  const response = await instence.get(`${COMMON_NOTE_PATH}/get-all-notes/${id}`);
  if(response?.status==200){
    return response;
  }else{
    throw new Error("Something went wrong with the get notes API!")
  }
};

export const getSingleNoteById = async (id: string): Promise<Note_Response> => {
  const response = await instence.get(`${COMMON_NOTE_PATH}/get-single-notes/${id}`);
  if(response.status==200){
    return response;
  }else{
    throw new Error("Something went wrong with the get notes API!")
  }
};

export const getBinNotesApi = async (id: string): Promise<Note_Response> => {
  const response = await instence.get(`${COMMON_NOTE_PATH}/bin-notes/${id}`);
  if(response.status==200){
    return response;
  }else{
    throw new Error("Something went wrong with the get notes bin API!")
  }
};



export const userDetailsApi = async (id: string): Promise<Note_Response> => {
  const response = await instence.get(`${Auth_PATH}/userinfo/${id}`);
  if(response.status==200){
    return response;
  }else{
    throw new Error("Something went wrong with the get notes bin API!")
  }
};
