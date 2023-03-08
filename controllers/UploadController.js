// const db = require("../models");
// const UserModel = db.user;
// const fs = require("fs");
import fs from 'fs'
import pkg from 'sharp';
const {sharp} = pkg;

import {UserModel} from "../models/user.js";


export async function  uploadProfil  (req, res) {
    //console.log(req.file);
    //renome le fichier avec extension .jpg
    const fileName = req.body.name +".jpg"; 
    try {
      if (
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpeg"
      ) throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      return res.status(201).json(err);
    }
  
    try {
      await sharp(req.file.buffer)
        .resize({ width: 150, height: 150 }) 
        .toFile(`${__dirname}/../../client/public/uploads/profil/${fileName}`
        );
      res.status(200).send("Photo de profil chargé avec succés");
    } catch (err) {
      res.status(400).send(err);
    }
    try{
        await UserModel.findByPk(req.body.userId)
            if (UserModel != null) {
                UserModel.update(
                    {picture: "./uploads/profil/" + fileName},
                    { where: { id: req.body.userId }}
                    )
                }   
            } catch (err) {
              console.log(err);
        }
    };