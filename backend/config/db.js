import mongoose from "mongoose";


export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://saagarchaudhari302:DeploymentProject@cluster0.hsdo2.mongodb.net/FOODDELIVERY-APP').then(() => { console.log("DB connected") }
   )
}