import { PostModel } from "../models/post.js";
import mongoose from "mongoose";

export async function addPost(req, res) {
  const result = await PostModel.insertMany({
    title: req.body.title,
    content: req.body.content,
    image: null,
    likeCount: req.body.likeCount,
    owner_id: req.authUser._id,
    tags: req.body.tags,
    like: [],
  });
  console.log(result)
  if (!result)
    return res.status(500).send({ message: "Erreur lors de l'ajout du post" });
  return res.status(200).json({ message: "Post créer",data: {"post_id" : result[0]._id } });
}

export async function getPostAll(req, res) {
  const posts = await PostModel.find({});

  if (!posts) {
    return res.status(404).json({ message: "Ce post n'existe pas" });
  }

  return res.status(200).json(posts);
}

export async function getPostById(req, res) {
  const post = await PostModel.findOne({ _id: req.params.id });
  if (!post) {
    return res.status(404).json({ message: "Ce post n'existe pas" });
  }

  return res.status(200).json(post);
}

export async function getPostSix(req, res) {
  const posts = await PostModel.aggregate([
    // {$lookup: {
    //     from: "tags", // collection name in db
    //     localField: "tag",
    //     foreignField: "_id",
    //     as: "tag"
    // } },
    {
      $lookup: {
        from: "comments", // collection name in db
        localField: "_id",
        foreignField: "post_id",
        as: "comments",
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 6 },
  ]);
  if (!posts) {
    return res.status(404).json({ message: "Ce post n'existe pas" });
  }
  console.log(posts.like)
  return res.status(200).json(posts);
}

export async function deletePost(req, res) {
  await PostModel.deleteOne({ _id: req.params.id });
  res.json({ message: "Post supprimé" });
}

export async function updatePost(req, res) {
  const post = await PostModel.findOne({ _id: req.params.id });

  if (!req.authUser._id !== !post.owner_id)
    return res.json({
      message: "Vous n'avez pas les droits pour modifier cet utilisateur",
    });
  const update = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  const result = await PostModel.updateOne(
    { _id: req.params.id },
    { $set: update }
  );

  return res.status(200).json({ message: "Update effectuée" });
}

export async function likePost(req, res) {
  // const ObjectId = mongoose.Types.ObjectId(req.authUser._id);
  const post = await PostModel.findOne({ _id: req.params.id });
  console.log(post.like.includes(req.authUser._id));
  console.log(req.authUser._id);
 

  if (post.like.includes(req.authUser._id)) {
    const update = {
      $pull: post.like.find((id)=> id.equals(req.authUser._id)) ,
 
    
    };
    console.log(update)
    const result = await PostModel.updateOne(
      { _id: req.params.id },
      { $set: update }
    );
    return res.status(200).json({ message: "unlike effectuée" });
  }
  const update = {
    like: req.authUser._id,
  };
  const result = await PostModel.updateOne(
    { _id: req.params.id },
    { $set: update }
  );

  return res.status(200).json({ message: "like effectuée" });
}


