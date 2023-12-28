import mongoose from 'mongoose';
import {DB_NAME} from '../constant.js';


console.log('UL',process.env.MONGODB_URL)

const Connect_DB = async () => {
    try {
        const connect_Instance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("DB Connected", connect_Instance.connection.host)
    } catch (error) {
        console.log("connection error" , error)
    }
}

export default Connect_DB