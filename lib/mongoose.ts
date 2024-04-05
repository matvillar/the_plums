import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connect = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('=> using new database connection');
  } catch (err) {
    console.error('Error connecting to database: ', err);
  }
};
