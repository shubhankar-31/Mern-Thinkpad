
import mongoose, { mongo } from "mongoose"

export const connectDB= async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected");
    } catch (error) {
        console.log("Couldn't connect to DB");
        process.exit(1);
    }

}