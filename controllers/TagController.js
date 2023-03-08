import {TagModel} from "../models/tag.js";

export async function addTag(req, res){
   
    const result = await TagModel.insertMany(
        {
            tag: req.body.tag,
        });

    if (!result)
        return res.status(500).send({"message" : "Erreur lors de l'ajout du tag"});
    return res.status(200).json({"message" : "tag créer"});
}