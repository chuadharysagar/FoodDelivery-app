import mongoose from "mongoose";


export const connectDB = async () => {
   await mongoose.connect('your mongodb string key').then(() => { console.log("DB connected") }
   )
}
