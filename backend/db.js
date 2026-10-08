import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();

export default db;