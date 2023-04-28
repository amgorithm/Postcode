// import mongoose from "mongoose";

// export async function connectToDb() {
//   mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const db = mongoose.connection;

//   db.once("connected", () => {
//     console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
//   });
// }

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDb() {
  const url = process.env.DATABASE_URL;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  await mongoose.connect(url, options);

  console.log(`Connected to MongoDB at ${url}`);
}

export default connectToDb;
