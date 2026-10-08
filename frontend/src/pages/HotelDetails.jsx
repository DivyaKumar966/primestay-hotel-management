import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import Map from "../components/Map";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { getHotelById } from "../services/hotelApi";

function HotelDetails() {

    const { id } = useParams();

    const [hotel, setHotel] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {

        const loadHotel = async () => {
            try {
                const data = await getHotelById(id);

                setHotel(data);

                document.title = `${data.title} | PRIME STAY`;

            } catch (error) {
                console.log(error);
            }
        };

        loadHotel();

    }, [id]);

    const handleBookNow = () => {
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    if (!hotel) {
        return (
            <>
                <Navbar />
                <p>Loading...</p>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={hotel.description}
                />
            </Helmet>

            <title>{hotel.title} | PRIME STAY</title>

            <Navbar />

            <div className="hotel-details">

                <div className="hotel-details-image">
                    <img
                        src={`http://localhost:5000${hotel.image}`}
                        alt={hotel.title}
                    />
                </div>

                <div className="hotel-details-info">

                    <h1>{hotel.title}</h1>
                    <p>{hotel.description}</p>
                    <p>Latitude: {hotel.latitude}</p>
                    <p>Longitude: {hotel.longitude}</p>

                    <h2>{hotel.price}</h2>

                    <button className="book-button" onClick={handleBookNow}>Book Now </button>

                </div>

                <div className="hotel-map-space">

                    <Map
                        latitude={Number(hotel.latitude)}
                        longitude={Number(hotel.longitude)}
                        title={hotel.title}
                    />

                </div>

            </div>

            <Footer />

             {showToast && (
                <Toast message="Booking successful!" />
            )}

        </>
    );
}

export default HotelDetails;