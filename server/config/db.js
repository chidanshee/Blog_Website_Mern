import mongoose from "mongoose";

const connectToMongo = async  () =>
    {
           const res = await mongoose.connect(process.env.MONGODB_URI);
           if(res)
            {
                console.log("Connected successfully");
            }
    };
export default connectToMongo;

