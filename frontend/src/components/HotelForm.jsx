import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getHotelById,
    createHotel,
    updateHotel
} from "../services/hotelApi";

function HotelForm({ hotelId: propHotelId }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const hotelId = propHotelId || id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!hotelId) {
            return;
        }

        let active = true;

        const loadHotel = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getHotelById(hotelId);

                if (!active) return;

                setTitle(data.title ?? "");
                setDescription(data.description ?? "");
                setLatitude(data.latitude ?? "");
                setLongitude(data.longitude ?? "");
                setPrice(data.price ?? "");
                setPreview(data.image ?? "");
            } catch (error) {
                console.error("Failed to load hotel:", error);

                if (active) {
                    setError(
                        "Hotel details could not be loaded. Please try again."
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadHotel();

        return () => {
            active = false;
        };
    }, [hotelId]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("price", price);

        if (image) {
            formData.append("image", image);
        }

        try {
            if (hotelId) {
                await updateHotel(hotelId, formData);

                navigate("/", {
                    state: {
                        toast: "Hotel updated successfully!"
                    }
                });
            } else {
                await createHotel(formData);

                navigate("/", {
                    state: {
                        toast: "Hotel created successfully!"
                    }
                });
            }
        } catch (error) {
            console.error("Failed to save hotel:", error);

            setError(
                error.response?.data?.message ||
                "Unable to save hotel. Please try again."
            );
        }
    };

    if (loading) {
        return (
            <div className="hotel-form-container">
                <p className="status">Loading hotel details...</p>
            </div>
        );
    }

    return (
        <div className="hotel-form-container">
            <form
                className="hotel-form"
                onSubmit={handleSubmit}
            >
                <h2>
                    {hotelId ? "Edit Hotel" : "Add Hotel"}
                </h2>

                {error && (
                    <p className="error">{error}</p>
                )}

                {!preview && (
                    <div className="image-upload">
                        <input
                            id="hotel-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required={!hotelId}
                        />

                        <label
                            htmlFor="hotel-image"
                            className="upload-box"
                        >
                            <span className="upload-icon">↑</span>
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

                <input
                    type="text"
                    placeholder="Hotel Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Hotel Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <input
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                />

                <input
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                />

                <input
                    type="number"
                    min="1"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <button type="submit">
                    {hotelId ? "Update Hotel" : "Save Hotel"}
                </button>
            </form>
        </div>
    );
}

export default HotelForm;
