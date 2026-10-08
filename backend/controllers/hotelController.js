import db from "../db.js";
import fs from "fs";


export const getHotels = async (req, res) => {

    try {

        const {
            title,
            minPrice,
            maxPrice,
            limit,
            offset
        } = req.query;


        const conditions = [];
        const values = [];


        if (title) {

            conditions.push(
                `title ILIKE $${values.length + 1}`
            );

            values.push(`%${title}%`);

        }


        if (minPrice) {

            conditions.push(
                `price >= $${values.length + 1}`
            );

            values.push(minPrice);

        }


        if (maxPrice) {

            conditions.push(
                `price <= $${values.length + 1}`
            );

            values.push(maxPrice);

        }


        let query = `
            SELECT *,
            COUNT(*) OVER() AS total_count
            FROM hotels
        `;


        if (conditions.length > 0) {

            query +=
                " WHERE " +
                conditions.join(" AND ");

        }


        if (limit) {

            query +=
                ` LIMIT $${values.length + 1}`;

            values.push(limit);

        }


        if (offset !== undefined) {

            query +=
                ` OFFSET $${values.length + 1}`;

            values.push(offset);

        }


        const result =
            await db.query(
                query,
                values
            );


        const total =
            result.rows.length > 0
                ? Number(
                    result.rows[0].total_count
                )
                : 0;


        const hotels =
            result.rows.map(
                ({ total_count, ...hotel }) =>
                    hotel
            );


        res.json({
            hotels,
            total
        });


    } catch (error) {

        console.log(
            error.message
        );

        res.status(500).json({
            message:
                "fetching data error"
        });

    }

};


export const createHotel = async (req, res) => {
    try {
        const { title, description, latitude, longitude, price } = req.body;

        if (!title || !description || !latitude || !longitude || !price || !req.file) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: "Price cannot be negative"
            });
        }

        const image = `/uploads/${req.file.filename}`;

        const result = await db.query(
            "INSERT INTO hotels(image, title, description, latitude, longitude, price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [image, title, description, latitude, longitude, price]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            message: "Creation error"
        });
    }
};


export const deleteHotel = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await db.query(
            "SELECT image FROM hotels WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }

        const imagePath = result.rows[0].image;

        if (imagePath) {
            const filePath = "." + imagePath;

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await db.query(
            "DELETE FROM hotels WHERE id = $1",
            [id]
        );

        res.json({
            message: "Hotel deleted successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


export const updateHotel = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            latitude,
            longitude,
            price
        } = req.body;

        if (!title || !description || !latitude || !longitude || !price) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: "Price must be greater than 0"
            });
        }

        if (req.file === undefined) {

            const result = await db.query(
                "UPDATE hotels SET title = $1, description = $2, latitude = $3, longitude = $4, price = $5 WHERE id = $6 RETURNING *",
                [
                    title,
                    description,
                    latitude,
                    longitude,
                    price,
                    id
                ]
            );

            res.json({
                message: "Hotel updated successfully",
                hotel: result.rows[0]
            });

        } else {

            const image = `/uploads/${req.file.filename}`;

            const result = await db.query(
                "UPDATE hotels SET title = $1, description = $2, latitude = $3, longitude = $4, price = $5, image = $6 WHERE id = $7 RETURNING *",
                [
                    title,
                    description,
                    latitude,
                    longitude,
                    price,
                    image,
                    id
                ]
            );

            res.json({
                message: "Hotel updated successfully",
                hotel: result.rows[0]
            });
        }

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getHotelById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await db.query(
            "SELECT * FROM hotels WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Hotel not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};