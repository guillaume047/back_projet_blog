import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TagSchema = new Schema(
    {
    
    tag: String,

    } ,  
     {
        timestamps: true
     }
);

export const TagModel = model("Tag", TagSchema);