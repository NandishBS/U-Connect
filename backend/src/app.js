import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { upload } from './middlewares/multer.middlewares.js'

export const app = express()

//use of middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json()) //express.json({limit:'50kb'}) use to add limit
app.use(express.urlencoded({extended:true}));
app.use( express.static("public") );
app.use(cookieParser());
app.use(upload.none());

// routes import and declaration
import userRouter from './routes/user.routes.js'

app.use("/api/users", userRouter)


export default app