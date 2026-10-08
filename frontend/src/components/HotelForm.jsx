import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getHotelById,
    createHotel,
    updateHotel
} from "../services/hotelApi";


function HotelForm({ hotelId }) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {

        if (!hotelId) {
            return;
        }

        const loadHotel = async () => {

            try {

                const data = await getHotelById(hotelId);

                setTitle(data.title);
                setDescription(data.description);
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                setPrice(data.price);

                if (data.image) {
                    setPreview(data.image);
                }

            } catch (error) {

                console.log(error);

            }
        };

        loadHotel();

    }, [hotelId]);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            setImage(file);

            setPreview(
                URL.createObjectURL(file)
            );

        }
    };


    // Create / Update
    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("price", price);


        if (image) {

            formData.append(
                "image",
                image
            );

        }


        try {

            if (hotelId) {

                // EDIT
                await updateHotel(
                    hotelId,
                    formData
                );

                navigate("/", {
                    state: {
                        toast: "Hotel updated successfully!"
                    }
                });

            } else {

                // CREATE
                formData.append(
                    "id",
                    Date.now()
                );

                await createHotel(
                    formData
                );

                navigate("/", {
                    state: {
                        toast: "Hotel created successfully!"
                    }
                });
            }

        } catch (error) {

            console.log(error);

        }
    };


    return (

        <div className="hotel-form-container">

            <form
                className="hotel-form"
                onSubmit={handleSubmit}
            >

                <h2>
                    {hotelId
                        ? "Edit Hotel"
                        : "Add Hotel"
                    }
                </h2>

                {!preview && (

                    <div className="image-upload">

                        <input
                            id="hotel-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <label
                            htmlFor="hotel-image"
                            className="upload-box"
                        >

                            <span className="upload-icon">
                                ↑
                            </span>

                            <span className="upload-title">
                                Upload Hotel Image
                            </span>

                            <span className="upload-text">
                                Click to choose an image
                            </span>

                        </label>

                    </div>
                )}


                {preview && (

                    <div className="selected-image">

                        <img
                            src={preview}
                            alt="Hotel Preview"
                            className="image-preview"
                        />

                        <input
                            id="change-hotel-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <label
                            htmlFor="change-hotel-image"
                            className="change-image"
                        >
                            Change Image
                        </label>

                    </div>

                )}


                {/* Hotel Title */}

                <input
                    type="text"
                    placeholder="Hotel Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />


                {/* Description */}

                <textarea
                    placeholder="Hotel Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    required
                />


                {/* Latitude */}

                <input
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) =>
                        setLatitude(e.target.value)
                    }
                    required
                />


                {/* Longitude */}

                <input
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) =>
                        setLongitude(e.target.value)
                    }
                    required
                />


                {/* Price */}

                <input
                    type="number"
                    min="0"
                    placeholder="Price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                    required
                />


                {/* Submit */}

                <button type="submit">

                    {hotelId
                        ? "Update Hotel"
                        : "Save Hotel"
                    }

                </button>

            </form>

        </div>

    );

}

export default HotelForm;