import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        
        // If the user hasn't set up MongoDB yet, spin up a local in-memory DB automatically
        if (!uri || uri.includes("your_mongodb_connection_string_here")) {
            console.log('No MongoDB URI found. Starting local in-memory MongoDB...');
            mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
        }

        await mongoose.connect(uri);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;