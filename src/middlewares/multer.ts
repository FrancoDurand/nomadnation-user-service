import multer from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";

const imagesDir = path.join(__dirname, "../../images");

if (!fs.existsSync(imagesDir))
    fs.mkdirSync(imagesDir)

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, imagesDir);
    },
    filename: (req: Request, file, cb) => {
        let userId;

        if (req.originalUrl === "/register") {
            userId = new ObjectId();
            req.body._id = userId;
        }
        else {
            if (!req.body._id)
                return cb(new Error("User ID is required"), "");

            userId = req.body._id;
        }

        const extension = path.extname(file.originalname);
        const fileName = userId + extension;

        req.body.profilePic = "\\images\\" + fileName;

        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

export default upload;

/* if (req.originalUrl == "/register") {
    const userId = new ObjectId;
    req.body._id = userId;

    const extension = path.extname(file.originalname);
    const fileName = userId + extension;

    req.body.profilePic = "\\images\\" + fileName;

    cb(null, fileName);
} */