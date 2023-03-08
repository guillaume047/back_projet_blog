import {CommentModel} from "../models/comment.js";

export async function addComment(req, res){
   
    const result = await CommentModel.insertMany(
        {
            text: req.body.text,
            post_id:  req.body.post_id,
            owner_id:  req.authUser._id
        });

    if (!result)
        return res.status(500).send({"message" : "Erreur lors de l'ajout du comment"});
    return res.status(200).json({"message" : "comment créer"});
}

export async function countComment(req, res){
   
    const result = await CommentModel.find({post_id:  req.body.post_id});

    if (!result)
        return res.status(500).send({"message" : "Erreur "});
        return res.status(200).json(result)
}