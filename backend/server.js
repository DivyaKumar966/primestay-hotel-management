import express from "express";
import cors from "cors";
import db from "./db.js";
import hotelRoutes from "./routes/hotelRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));


app.use("/api/hotels", hotelRoutes);

app.listen(5000, () => {
    console.log("Server Running on port 5000");
});