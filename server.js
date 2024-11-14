import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { spawn } from "child_process";
import morgan from "morgan";
import path from 'path'
import { fileURLToPath } from "url";

const app = express();
app.use(morgan("dev"));
dotenv.config();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname,'./client/build')))
app.post("/api",async (req, res) => {
  try {
    const { comment } = req.body;
    const pythonProceess = spawn("python3", ["app.py", comment]);
    pythonProceess.stdout.on("data", (data) => {
        res.send({
            ok:true,
            res:JSON.parse(data.toString())
        })
    });
  } catch (error) {
    console.log(error.message);
  }
});
app.use("*",(request,response)=>{
    response.sendFile(path.join(__dirname,'./client/build/index.html'))
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
