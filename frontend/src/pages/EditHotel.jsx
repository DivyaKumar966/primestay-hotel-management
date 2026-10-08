import {useParams } from "react-router-dom";

import {Helmet} from "react-helmet-async";

import Navbar from "../components/Navbar";
import HotelForm from "../components/HotelForm";


function EditHotel() {

    const { id } =
        useParams();


    return (
        <>
            <Helmet> <title>PRIME STAY - Edit Hotel</title>
            </Helmet>

            <Navbar />

            <HotelForm hotelId={id}/>

        </>
    );
}

export default EditHotel;