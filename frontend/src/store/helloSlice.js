import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message : "Hello World !",
    user : ""
}

const helloSlice = createSlice({
    name : "hello",
    initialState,
    reducers : {
        changeMessage : (state, action)=>{
            state.message = "bye world!"
            state.user = action.payload.user
        }
    }
})

export const { changeMessage } = helloSlice.actions

export default helloSlice.reducer;