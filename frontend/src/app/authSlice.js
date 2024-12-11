import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usn : '',
    username : '',
    password : '',
    role : '',
    avatar : '',
    login : true,
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
        },
        logout : (state, action)=>{
            // state.login = false
        },
        login : (state, action)=>{
            state.login = true
        }
    }
})

export const {verify , clearState,logout, login } = authSlice.actions;
export default authSlice.reducer;