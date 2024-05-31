import express from "express";
import cors from "cors";
import userRouter from "./routes/user-router";
import path from "path"

const app = express();
const port = 3002;

const imagesDir = path.join(__dirname, "../images");

app.use(cors());
app.use(express.json());
app.use("/images", express.static(imagesDir));

app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});