import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
    {
    
    title: String,
    content: String,
    image: String,
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    tag:[{
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
    
//    tag:{
//         [{type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'Tag'}]
//     }
    
     {
        timestamps: true
     }
);

export const PostModel = model("Post", PostSchema);