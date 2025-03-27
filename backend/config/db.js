import mongoose from "mongoose";


export const connectDB = async () => {
   await mongoose.connect(process.env.MONGODB_API_KEY).then(() => { console.log("DB connected") }
   )
}
