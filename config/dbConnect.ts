import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const Connect = await mongoose.connect(process.env.MONGO_URI!);
    if (!Connect) {
      console.log("DB connection failed");
    }
    return console.log("DB_CONNECTED!");
  } catch (error) {
    console.log("something went wrong on DB connection!");
  }
};
