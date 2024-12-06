import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usn : '',
    username : '',
    password : '',
    role : '',
    avatar : '',
    login : false,
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        verify : (state, action)=>{
            const {usn, password, username, role} = action.payload
            state.usn = usn
            state.username = username
            state.password = password
            state.role = role
        },
        clearState : (state,action)=>{
            state.usn = ''
            state.username = ''
            state.password = ''
            state.role = ''
            state.avatar = ''
            state.login = false
        },
    }
})

export const {verify , clearState } = authSlice.actions;
export default authSlice.reducer;