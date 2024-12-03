import {configureStore} from '@reduxjs/toolkit'
import helloReducer from './services/helloSlice.js'

const store = configureStore({
    reducer:{
        hello : helloReducer
    }
})

export default store;