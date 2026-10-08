import axios from "axios";

const API_URL = "https://primestay-hotel-management.onrender.com/api/hotels";


export const getHotels = async (params = {}) => {

    const response = await axios.get(
        API_URL,
        {
            params
        }
    );

    return response.data;
};


export const getHotelById = async (id) => {

    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;
};


export const createHotel = async (formData) => {

    const response = await axios.post(
        API_URL,
        formData
    );

    return response.data;
};


export const updateHotel = async (id, formData) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        formData
    );

    return response.data;
};


export const deleteHotel = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};