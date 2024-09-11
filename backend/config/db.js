import mongoose from "mongoose";


export const connectDB = async () => {
   await mongoose.connect('add your mongodb key here').then(() => { console.log("DB connected") }
   )
}
