import {createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import {getHotels} from "../services/hotelApi";


export const fetchHotels = createAsyncThunk("hotels/fetchHotels",
    async (params) => {

        const data = await getHotels(params);

        return data;
    }
);

const initialState = {
    hotels: [],
    loading: false,
    error: null,
    search: "",
    minPrice: "",
    maxPrice: "",
    currentPage: 1,
    hotelsPerPage: 5,
    totalHotels: 0
};


const hotelSlice = createSlice({

    name: "hotels",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
            state.currentPage = 1;
        },
        resetFilters: (state) => {
        state.search = "";
        state.minPrice = "";
        state.maxPrice = "";
        state.currentPage = 1;
    },

        setPriceFilter: (state, action) => {
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
            state.currentPage = 1;
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        removeHotel: (state, action) => {

            state.hotels = state.hotels.filter(
                (hotel) => hotel.id !== action.payload
            );
            state.totalHotels =
                Math.max(0, state.totalHotels - 1);}},

    extraReducers: (builder) => {
        builder
            .addCase(
                fetchHotels.pending,
                (state) => {

                    state.loading = true;
                    state.error = null; })
      .addCase(
                fetchHotels.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.hotels =action.payload.hotels;
                    state.totalHotels =action.payload.total;
                })

            .addCase(
                fetchHotels.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =action.error.message;
                });}
});


export const {setSearch,setPriceFilter,setCurrentPage,removeHotel,resetFilters} = hotelSlice.actions;
export default hotelSlice.reducer;