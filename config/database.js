import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI no está definida");
        }

        const conn = await mongoose.connect(uri);

        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;