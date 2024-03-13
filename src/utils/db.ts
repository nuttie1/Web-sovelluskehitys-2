//module is in strict mode by default ;)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/**
 * This function connects to the database
 * @returns The connection to the database
 */
const mongoConnect = async () => {
  console.log('DB_URL', process.env.DB_URL);
  const connection = await mongoose.connect(process.env.DB_URL as string);
  console.log('DB connected successfully');
  return connection;
};

export default mongoConnect;
