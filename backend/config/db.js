import mongoose from "mongoose";


export const connectDB = async () => {
   console.log(process.env.DATABASE_API_KEY)
   await mongoose.connect(process.env.DATABASE_API_KEY).then(() => { console.log("DB connected") }
   )
}
