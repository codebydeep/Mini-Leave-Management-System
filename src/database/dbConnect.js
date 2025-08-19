import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;