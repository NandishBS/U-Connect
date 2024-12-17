import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import postReducer from './postSlice.js'
import profileReducer from './profileSlice.js'

const store = configureStore({
    reducer : {
        auth : authReducer,
        post : postReducer,
        profile : profileReducer
    }
})

export default store;