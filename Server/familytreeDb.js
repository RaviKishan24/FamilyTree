import mongoose from "mongoose";
import env from "dotenv"
env.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Databse connected Successfully!")
        // console.log(mongoose.connection.name)
    } catch (error) {
        console.log("Error occured while connecting database" + error);
        process.exit(1);
    }
}

export default connectDb;