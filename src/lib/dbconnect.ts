<<<<<<< HEAD
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}
const connection: ConnectionObject = {}

export const dbconnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log('Already connected to database');
        return 
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL! || '',
            {serverSelectionTimeoutMS: 30000,});
        connection.isConnected = db.connections[0].readyState
        
        console.log('DB connected succefully ');
        
    } catch (error: any) {
        
        console.log('Somthing went wrong with db connecton falied',error);
        process.exit(1)
    }
}
=======
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}
const connection: ConnectionObject = {}

export const dbconnect = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log('Already connected to database');
        return 
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL! || '',
            {serverSelectionTimeoutMS: 30000,});
        connection.isConnected = db.connections[0].readyState
        
        console.log('DB connected succefully ');
        
    } catch (error: any) {
        
        console.log('Somthing went wrong with db connecton falied',error);
        process.exit(1)
    }
}
>>>>>>> 56f4a3ac6f269db8a4432409246901ee61922ba2
