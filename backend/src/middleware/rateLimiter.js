import redis from "../../config/redis.server.js";


export const rateLimiter=(limit,timer)=>async (req,res,next)=>{
    const clientIP=req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const requestCount=await redis.incr(`${clientIP}:request_count`);
    const key=`${clientIP}:request_count`;
    


    //Setting one & only one global timer for the key
    if(requestCount===1)
        await redis.expire(key,timer);
    
    let timeLEft= await redis.ttl(key);
    if(requestCount>limit){
       
    return res.status(429).
        send(`Try again after ${timeLEft}seconds`);
    } 

    next();
}