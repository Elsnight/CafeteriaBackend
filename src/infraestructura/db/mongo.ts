import mongoose from "mongoose";

import { MONGO_URI } from "../config";

export const conectar = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log('MongoDB conectado');

  } catch (error) {
    console.log(error);
    throw new Error('Error de conexion, ' + error)
  }
}

export const desconectar = async () => {
  await mongoose.disconnect()
}