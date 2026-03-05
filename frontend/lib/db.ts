import mongoose from "mongoose";

// Cached connection stored on the global object
// survives between warm serverless function invocations
declare global {
    // eslint-disable-next-line no-var
    var mongooseConn: typeof mongoose | null;
}

export async function connectDB(): Promise<void> {
    // Reuse an existing warm connection (important for serverless)
    if (global.mongooseConn) return;

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is not set");
    }

    global.mongooseConn = await mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000, // fail fast if Atlas is unreachable
        connectTimeoutMS: 5000,
    });
}
