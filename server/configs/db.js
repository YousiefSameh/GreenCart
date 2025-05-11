import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("MongoDB Connected Successfully!");
    });
    await mongoose.connect(`${process.env.MONGO_URI}/greencart`)
  } catch (error) {
    console.error(error.message);
  }
};


export default connectDB;