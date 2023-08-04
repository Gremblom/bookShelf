import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import {response} from "express";

const uploadFile = async (req, res = response)=>{
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file){
            return res.status(400).send("No files were uploaded");
        }



        const {file} = req.files;
        const uploadPath = path.join(__dirname , "../uploads" , file.name);

        file.mv(uploadPath, (err)=>{
            if (err){
                return res.status(400).send(err);
            }

            res.json({msg : "File uploaded" + uploadPath});
        })
    } catch (error) {
        console.log(error);
    }
}

export default uploadFile;