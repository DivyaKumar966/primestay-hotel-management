import express from "express";
import upload from "../multer/upload.js";
import {getHotels,createHotel,updateHotel,deleteHotel,getHotelById} from "../controllers/hotelController.js";

const route = express.Router();

route.get("/", getHotels);

route.post("/", upload.single("image"), createHotel);

route.put("/:id", upload.single("image"), updateHotel);

route.delete("/:id", deleteHotel)

route.get("/:id", getHotelById);

export default route
