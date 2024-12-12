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
            state.login = false
        },
        login : (state, action)=>{
            state.login = true
        },
        setUser : (state, action)=>{
            const {usn, username, password, role , avatar} = action.payload
            state.usn = usn
            state.username = username 
            state.password = password
            state.role = role
            state.avatar = avatar
        }
    }
})

export const {verify , clearState, logout, login, setUser } = authSlice.actions;
export default authSlice.reducer;