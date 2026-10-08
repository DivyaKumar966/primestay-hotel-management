import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HotelForm from "../components/HotelForm";

function AddHotel() {

    return (
        <>
            <Helmet>
                <title>
                    PRIME STAY - Add Hotel
                </title>
            </Helmet>

            <Navbar />

            <HotelForm />
            <Footer />

        </>
    );
}

export default AddHotel;