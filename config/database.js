import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI no definida");

    const conn = await mongoose.connect(uri);
    isConnected = true;

    console.log("MongoDB conectado:", conn.connection.host);
};

export default connectDB;