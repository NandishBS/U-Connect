import 'dotenv/config'
import connectDB from './db/index.db.js'
import app from './app.js'

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log("Server is succefully running at PORT : ", process.env.PORT)
    } );
})
.catch((err)=>{
    console.log("ERROR :: ./src/index.js :: MongoDB connection Failed :: ",err);
})