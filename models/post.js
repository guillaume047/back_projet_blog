import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
    {
    
    title: String,
    content: String,
    image: 
    {
        type:String,
        default:"uploads/post/",
    },
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Tag'}
    ],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'}
    ]
    },
     {
        timestamps: true
     }
);

export const PostModel = model("Post", PostSchema);