import mongoose from "mongoose";

export async function connect(){

    try {
        mongoose.connect(process.env.MONGO_URL!)

        const connection= mongoose.connection;
        connection.on("connected", ()=>{
            console.log("MongoDB is connected");
            
        })
        connection.on("error", (err)=>{
             console.log("MongoDB connection error:", err);
             
        })

    } catch (error) {
        console.log("Something went wrong in connecting db")
        console.log(error)
    }
}