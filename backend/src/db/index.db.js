import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.U_CONNECT_DB}`);
        console.log('/n MongoDB Connected !! DB HOST:', connectionInstance.connection.host);
    } catch (err) {
        console.log("Error :: src/db/index.js :: connectDB function :: MONGODB Connection failed", err);
        process.exit(1);
    }
}

export default connectDB