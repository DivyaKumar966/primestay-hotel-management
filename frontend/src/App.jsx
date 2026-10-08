import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import HotelList from "./pages/HotelList";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import HotelDetails from "./pages/HotelDetails";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<HotelList />}/>

                <Route path="/add-hotel"element={<AddHotel />}/>

                <Route path="/edit/:id" element={<EditHotel />} />

                <Route path="/hotel/:id" element = {<HotelDetails />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;