
import instence from "../config/Axios";
import { InputFieldPayload, OTPInputFieldPayload, ResendInputFieldPayload, LoginFieldPayload } from "../constant/TypeNotes";
const COMMON_NOTE_PATH = '/note';
const Auth_PATH = '/auth';

interface addNote_Interface {
    user: string,
    noteTitle: string,
    description: string,
}


interface PostApiResponse {
    data: any;
    status: number;
    statusText: string;
}






export const addNoteApi = async (data: addNote_Interface): Promise<PostApiResponse> => {
    const response = await instence.post(`${COMMON_NOTE_PATH}/add-note`, data)
    if (response.status == 201) {
        return response
    } else {
        throw new Error("Some thing is wrong with create notes api")
    }
}

export const singupApi = async (data: InputFieldPayload): Promise<PostApiResponse> => {
    const response = await instence.post(`${Auth_PATH}/register`, data)
    if (response.status === 201) {
        return response;
    } else {
        throw new Error("some thing is wrong")
    }
}

export const OtpVerifyApi = async (data: OTPInputFieldPayload): Promise<PostApiResponse> => {
    const response = await instence.post(`${Auth_PATH}/otpVerify`, data)
    if (response.status == 200) {
        return response
    } else {
        throw new Error("some thing is wrong")
    }
}
export const ResendOtpApi = async (data: ResendInputFieldPayload): Promise<PostApiResponse> => {
    const response = await instence.post(`${Auth_PATH}/otpresend`, data)

    if (response?.status == 200) {
        return response
    } else {
        throw new Error("some thing is wrong")
    }
}

export const UserLoginApi = async (data: LoginFieldPayload): Promise<PostApiResponse> => {
    const response = await instence.post(`${Auth_PATH}/login`, data)
    if (response?.status == 200) {
        return response
    } else {
        throw new Error("Some thing is wrong")
    }
}