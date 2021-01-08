const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            required:true,
            maxlength:32
        },
        category:{
            type:String,
        },
        sellerType:{
            type:String,
        },
        sellerType:{
            type:String,
        },
        description:{
            type:String,
        },
        price:{
            type:Number,
            trim:true,
            // required:true,
            maxlength:32,
            
        },
        negotiable:{
            type:Boolean
        },
        featured:{
            type:Boolean
        },
        location:{
            type:String
        },
        contactPerson:{
            type:String
        },
        email:{
            type:String
        },
        contactNumber:{
            type:String
        },
        user:{
            type:ObjectId,
            ref:'User',
            required:true,
        }

    },
   {timestamps:true}
)

module.exports = mongoose.model("Posts",productSchema)