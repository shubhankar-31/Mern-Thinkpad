import  Redis  from "ioredis";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
const redis=new Redis({
    host:process.env.REDIS_HOST,
    port: process.env.REDIS_POST,
    password:process.env.REDIS_PASSWORD

})
export default redis;