import { Link } from "react-router-dom";
import OptionsMenu from "./OptionsMenu";

function HotelCard({ hotel, onDelete }) {

    return (
        <div className="hotel-card">

            <Link
                to={`/hotel/${hotel.id}`}
                className="hotel-card-main">

                <div className="hotel-card-image-wrapper">

                    <img
                        src={hotel.image}
                        alt={hotel.title}
                        className="hotel-card-image"/>

                </div>

                <div className="hotel-card-content">

                    <span className="hotel-location">
                        📍 Hotel Stay</span>

                    <h3>{hotel.title}</h3>

                    <p className="hotel-description">
                        {hotel.description}
                    </p>

                    <div className="coordinates">

                        <span>
                            Latitude: {hotel.latitude}
                        </span>

                        <span>
                            Longitude: {hotel.longitude}
                        </span>

                    </div>

                </div>

            </Link>

            <div className="hotel-price">

                <span>Starting from</span>

                <h2>₹{hotel.price}</h2>

                <small>per night</small>

                <Link
                    to={`/hotel/${hotel.id}`}
                    className="view-button"
                > View Details →</Link>
            </div>

            <OptionsMenu
                hotelId={hotel.id}
                onDelete={onDelete}/>

        </div>
    );
}

export default HotelCard;