import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../../../constant/TypeNotes";
import { getToken,getUserCookies } from "../../../utils/Helper";


const authToken = getToken()
const user :any = getUserCookies();
const userObj:any =  JSON.parse(decodeURIComponent(user))



const initialState: UserInterface = {
    isAuthenticated: !!authToken || false, 
    userName: userObj?.userName || null, 
    id: userObj?._id || null, 
    userToken: authToken || null, 
};


const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
       
        loginAction: (state, action: PayloadAction<UserInterface>) => {
            state.isAuthenticated = true;
            state.userName = action.payload.userName;
            state.id = action.payload.id;
            state.userToken = action.payload.userToken;
        },

        LogoutAction: (state) => {
            state.isAuthenticated = false;
            state.userName = null;
            state.id = null;
            state.userToken = null;
        },
    },
});

export const { loginAction, LogoutAction } = authenticationSlice.actions;
export default authenticationSlice.reducer;
