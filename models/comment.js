import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
    {
    
    text: String,
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Post'
    }
    } ,  
     {
        timestamps: true
     }
);

export const CommentModel = model("Comment", CommentSchema);