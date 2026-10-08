import db from "../db.js";
import cloudinary from "../config/cloudinary.js";


// =========================
// GET ALL HOTELS
// =========================

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


        // Search by title
        if (title) {

            conditions.push(
                `title ILIKE $${values.length + 1}`
            );

            values.push(`%${title}%`);

        }


        // Minimum price
        if (minPrice) {

            conditions.push(
                `price >= $${values.length + 1}`
            );

            values.push(minPrice);

        }


        // Maximum price
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


        // WHERE conditions
        if (conditions.length > 0) {

            query +=
                " WHERE " +
                conditions.join(" AND ");

        }


        // Consistent pagination order
        query += " ORDER BY id";


        // Limit
        if (limit) {

            query +=
                ` LIMIT $${values.length + 1}`;

            values.push(limit);

        }


        // Offset
        if (offset !== undefined) {

            query +=
                ` OFFSET $${values.length + 1}`;

            values.push(offset);

        }


        const result = await db.query(
            query,
            values
        );


        const total =
            result.rows.length > 0
                ? Number(result.rows[0].total_count)
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

        console.log(error.message);

        res.status(500).json({
            message: "Fetching data error"
        });

    }

};


// =========================
// CREATE HOTEL
// =========================

export const createHotel = async (req, res) => {

    try {

        const {
            title,
            description,
            latitude,
            longitude,
            price
        } = req.body;


        // Required field validation
        if (
            !title ||
            !description ||
            !latitude ||
            !longitude ||
            !price ||
            !req.file
        ) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        // Price validation
        if (price <= 0) {

            return res.status(400).json({
                message: "Price must be greater than 0"
            });

        }


        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(

            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,

            {
                folder: "prime-stay"
            }

        );


        const image = result.secure_url;


        // Insert hotel into database
        const dbResult = await db.query(

            `INSERT INTO hotels
            (
                image,
                title,
                description,
                latitude,
                longitude,
                price
            )
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING *`,

            [
                image,
                title,
                description,
                latitude,
                longitude,
                price
            ]

        );


        res.status(201).json(
            dbResult.rows[0]
        );


    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Creation error"
        });

    }

};


// =========================
// DELETE HOTEL
// =========================

export const deleteHotel = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await db.query(

            `DELETE FROM hotels
             WHERE id = $1
             RETURNING id`,

            [id]

        );


        // Hotel not found
        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Hotel not found"
            });

        }


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


// =========================
// UPDATE HOTEL
// =========================

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


        // Required field validation
        if (
            !title ||
            !description ||
            !latitude ||
            !longitude ||
            !price
        ) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        // Price validation
        if (price <= 0) {

            return res.status(400).json({
                message: "Price must be greater than 0"
            });

        }


        // =========================
        // UPDATE WITHOUT NEW IMAGE
        // =========================

        if (!req.file) {

            const result = await db.query(

                `UPDATE hotels
                 SET
                    title = $1,
                    description = $2,
                    latitude = $3,
                    longitude = $4,
                    price = $5
                 WHERE id = $6
                 RETURNING *`,

                [
                    title,
                    description,
                    latitude,
                    longitude,
                    price,
                    id
                ]

            );


            if (result.rows.length === 0) {

                return res.status(404).json({
                    message: "Hotel not found"
                });

            }


            return res.json({

                message: "Hotel updated successfully",

                hotel: result.rows[0]

            });

        }


        // =========================
        // UPDATE WITH NEW IMAGE
        // =========================

        const uploadResult =
            await cloudinary.uploader.upload(

                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,

                {
                    folder: "prime-stay"
                }

            );


        const image =
            uploadResult.secure_url;


        const result = await db.query(

            `UPDATE hotels
             SET
                title = $1,
                description = $2,
                latitude = $3,
                longitude = $4,
                price = $5,
                image = $6
             WHERE id = $7
             RETURNING *`,

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


        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Hotel not found"
            });

        }


        res.json({

            message: "Hotel updated successfully",

            hotel: result.rows[0]

        });


    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Server error"
        });

    }

};


// =========================
// GET HOTEL BY ID
// =========================

export const getHotelById = async (req, res) => {

    try {

        const { id } = req.params;


        const result = await db.query(

            `SELECT *
             FROM hotels
             WHERE id = $1`,

            [id]

        );


        // Hotel not found
        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Hotel not found"
            });

        }


        res.json(
            result.rows[0]
        );


    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Server error"
        });

    }

};