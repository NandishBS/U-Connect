import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const app = express()

//use of middlewares
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json()) //express.json({limit:'50kb'}) use to add limit
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// routes import and declaration
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'

app.use("/api/user", userRouter)
app.use("/api/post", postRouter)

app.get("/", (req, res)=>{
    res.send("welcome to backend of my U-Connect app")
})

export default app