import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo= async ()=>{
    try {
        const res= await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully Connecting to database (Chat_App)");
        
    } catch (error) {
        console.log("Error Connecting to Database : : "+error);
        process.exit(1);
    }
}

export default connectToMongo;