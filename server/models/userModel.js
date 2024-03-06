const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})

userSchema.methods.setPassword = async function(password){
    try {
        this.password = await bcrypt.hash(password, 10);
    } catch (error) {
     console.log('error while hashing password', error);   
    }
}

userSchema.methods.isPasswordValid = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = mongoose.model('user', userSchema)