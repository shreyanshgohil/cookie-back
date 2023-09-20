import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

app.post('/hello-wrold',(req,res,next)=>{
  res.cookie("hello","world",{
    httpOnly:true,
    maxAge: 60 * 60 * 1000,
  }).json({"Done":"Done"})
})

app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});