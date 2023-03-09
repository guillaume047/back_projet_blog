import {TagModel} from "../models/tag.js";

export async function addTag(req, res){
   
    const result = await TagModel.insertMany(
        {
            tags: req.body.tags,
        });

    if (!result)
        return res.status(500).send({"message" : "Erreur lors de l'ajout du tag"});
    return res.status(200).json({"message" : "tag créer"});
}
export async function getTagAll(req,res){
    
    const tags = await TagModel.find({});

    if(!tags){
        return res.status(404).json({"message":"Cet Utilisateur n'existe pas"});
    }

    return res.status(200).json(tags);
}