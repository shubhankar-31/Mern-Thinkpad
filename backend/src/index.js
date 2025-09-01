import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import notesRouter from "./routes/notes.routes.js";
import { connectDB } from "../config/db.js";
import redis from "../config/redis.server.js";
import { rateLimiter } from "./middleware/rateLimiter.js";


redis.on("connect",()=>{
    console.log("Redis connected ");
})

//disabling tips in console 
dotenv.config({ quiet: true });
const app=express();
const __dirname=path.resolve();
app.use(express.json());

if(process.env.NODE_ENV!=="production"){
    app.use(cors({
        origin:"http://localhost:5173"
    }));
    
}
app.use(rateLimiter(100,200));
app.use("/api/notes",notesRouter);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    })
}



connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`Listening at port 5000`);
        });
}).catch((err)=>{
    console.log("Database coudn't connect",err);
})
