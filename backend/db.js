import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();
const db = new Client({
    user: process.env.user_name,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
});

db.connect()

export default db;