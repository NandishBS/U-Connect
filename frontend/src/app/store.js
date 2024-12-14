import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import postReducer from './postSlice.js'

const store = configureStore({
    reducer : {
        auth : authReducer,
        post : postReducer
    }
})

export default store;