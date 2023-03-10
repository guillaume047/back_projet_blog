// const db = require("../models");
// const UserModel = db.user;
// const fs = require("fs");
import fs from "fs";
import sharp from "sharp";

import { PostModel } from "../models/post.js";

export async function uploadImgPost(req, res) {
  console.log(req.file);
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file");
    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
   
    return res.status(201).json(err);
  }
  
  try {
    await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .toFile(`uploads/post/${req.file.originalname}`);
   
  } catch (err) {
    
    res.status(400).send(err);
  }
  try {
    await PostModel.findByIdAndUpdate(
      req.body.postId,
     
      { $set: { image: "post/" + req.file.originalname } },
      console.log(req.body.postId),
      // { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    console.log(err);
  }
}
