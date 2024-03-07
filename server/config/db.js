const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL_DEVELOPMENT)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error.mess);
    }
}
module.exports = connectDB
