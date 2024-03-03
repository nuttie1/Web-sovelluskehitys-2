//module is in strict mode by default ;)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  console.log('DB_URL', process.env.DB_URL);
  const connection = await mongoose.connect(process.env.DB_URL as string);
  console.log('DB connected successfully');
  return connection;
};

export default mongoConnect;
