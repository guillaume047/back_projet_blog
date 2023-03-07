import {PostModel} from "../models/post.js";
export async function addPost(req, res){
   
    const result = await PostModel.insertMany(
        {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            likeCount: req.body.likeCount,
            owner_id:  req.authUser._id
        });

    if (!result)
        return res.status(500).send({"message" : "Erreur lors de l'ajout du post"});
    return res.status(200).json({"message" : "Post créer"});
}

export async function getPostAll(req,res){
    const posts = await PostModel.find({});
    if(!posts){
        return res.status(404).json({"message":"Cet Utilisateur n'existe pas"});
    }

    return res.status(200).json(posts);
}

export async function getPostById(req,res){
    const post = await PostModel.findOne({_id:req.params.id});
    if(!post){
        return res.status(404).json({"message":"Cet Utilisateur n'existe pas"})
    }

    return res.status(200).json(post);
}

export async function getPostSix(req,res){
    const posts = await PostModel.aggregate([
        { $sample: { size: 6 } }
    ]);
    if(!posts){
        return res.status(404).json({"message":"Ce post n'existe pas"});
    }
    return res.status(200).json(posts);
}

export async function deletePost(req, res){
    await PostModel.deleteOne({ _id: req.params.id });
    res.json({ "message": "Post supprimé" });
}


export async function updatePost(req,res){
    const post=await PostModel.findOne({_id:req.params.id});
    console.log(PostModel.id)
    if (!req.authUser._id  !== !post.owner_id)
        return res.json({"message":"Vous n'avez pas les droits pour modifier cet utilisateur"});
        const update = {
             title: req.body.title ,
             content: req.body.content,
             image: req.body.image
          };
          const result = await PostModel.updateOne({ _id:req.params.id }, { $set:update });
            // PostModel.updateOne(
            //   { title: req.body.title }, 
            //   { where: { id: req.params.id } },
            //   { $set:update }
            //   );  
        
              return res.status(200).json({"message" : "Update effectuée"}); 
              
    // if(req.body){
    //     const update = {
    //         title: req.body.title,
    //         content: req.body.content,
    //         image: req.body.image,
    //       };
        
    }

   
