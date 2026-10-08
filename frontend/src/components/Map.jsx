import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Map({ latitude, longitude, title }) {

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{
                width: "100%",
                height: "350px"
            }}
        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
                position={[latitude, longitude]}
            >
                <Popup>
                    {title}
                </Popup>
            </Marker>

        </MapContainer>
    );
}

export default Map;