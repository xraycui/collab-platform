import { error } from "console";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/collab'

export async function connectMogo () {
  try {
    if(mongoose.connection.readyState === 1) return
  
    await mongoose.connect(MONGO_URL)
    
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
  } catch (err) {
    console.log('Mongo DB connection error ', error)
  }
}