import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { upload } from './middlewares/multer.middlewares.js'

export const app = express()

//use of middlewares
app.use(cors())
app.use(express.json()) //express.json({limit:'50kb'}) use to add limit
app.use(express.urlencoded({extended:true}));
app.use( express.static("public") );
app.use(cookieParser());
app.use(upload.none());

// routes import and declaration
import userRouter from './routes/user.routes.js'
app.use("/api/user", userRouter)

app.get("/", (req, res)=>{
    res.send("welcome to backend of my U-Connect app")
})

export default app