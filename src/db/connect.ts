import mongoose from 'mongoose';
import {envStringVar} from "../utils/dotenv.utils"

const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(envStringVar('MONGO_URI'));
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        if(err instanceof Error){
            console.log(`Error: ${err.message}`);
        }
        else{
            console.log(`Error: ${err}`);
        }
        process.exit(1);
    }
}

export default connectDb;