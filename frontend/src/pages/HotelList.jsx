import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

import {
    fetchHotels,
    setSearch,
    setPriceFilter,
    setCurrentPage,
    removeHotel
} from "../redux/hotelSlice";

function HotelList() {

    const dispatch = useDispatch();
    const location = useLocation();

    const {
        hotels,
        loading,
        error,
        search,
        minPrice,
        maxPrice,
        currentPage,
        hotelsPerPage,
        totalHotels
    } = useSelector((state) => state.hotels);

    const [toast, setToast] = useState(
        location.state?.toast || ""
    );

    const totalPages = Math.ceil(
        totalHotels / hotelsPerPage
    );


    
    useEffect(() => {

        dispatch(
            fetchHotels({
                title: search,
                minPrice: minPrice,
                maxPrice: maxPrice,
                limit: hotelsPerPage,
                offset: (currentPage - 1) * hotelsPerPage
            })
        );

    }, [
        dispatch,
        search,
        minPrice,
        maxPrice,
        currentPage,
        hotelsPerPage
    ]);


    useEffect(() => {

        if (!location.state?.toast) {
            return;
        }

        const timer = setTimeout(() => {
            setToast("");
        }, 3000);

        window.history.replaceState(
            {},
            document.title
        );

        return () => {
            clearTimeout(timer);
        };

    }, [location.state?.toast]);

    const handleSearch = (value) => {

        dispatch(
            setSearch(value)
        );

    };
    const handleFilter = (values) => {

        dispatch(
            setPriceFilter(values)
        );

    };
    const handleDelete = (id) => {

        dispatch(
            removeHotel(id)
        );

        setToast(
            "Hotel deleted successfully!"
        );

        setTimeout(() => {
            setToast("");
        }, 3000);

    };


    return (

        <>

            <Helmet>
                <title>PRIME STAY - Hotels</title>
                </Helmet>


            <Navbar />

            {toast && (
                <Toast
                    message={toast}
                />
            )}

            <section className="hero">

                <div className="hero-overlay">

                    <div className="hero-content">

    <span>DISCOVER AMAZING STAYS</span>

              <h1>Stay Better, Live Better.</h1>

                        <p>Explore beautiful hotels and unforgettable destinations.</p>

                    </div>

                </div>


                <div className="hero-search">

                    <SearchBar
                        onSearch={handleSearch}
                    />

                </div>

            </section>


            <div className="filter-section">

                <span className="filter-title">
                    Filter by Price
                </span>

                <Filter
                    onFilter={handleFilter}
                />

            </div>

            <main className="hotel-section">

                <div className="section-heading">

                    <div>

                        <span className="small-heading"></span>

                        <h2>Available Hotels</h2>

                    </div>


                    <span className="hotel-count">
                        {totalHotels} Hotels Found
                    </span>

                </div>

                {loading && (
                    <p className="status"> Loading hotels...</p>
                )}

                {error && (
                    <p className="error">{error} </p>
                )}

                {!loading &&
                    hotels.length === 0 && (
                        <p className="status"> No hotels found. </p>
                    )
                }

                <div className="hotel-list">

                    {hotels.map((hotel) => (

                        <HotelCard
                            key={hotel.id}
                            hotel={hotel}
                            onDelete={handleDelete}
                        />

                    ))}

                </div>

    <Pagination 
            currentPage={currentPage}
                totalPages={totalPages}
               onPageChange={(page) =>
                 dispatch(
            setCurrentPage(page))}/>
            </main>
            <Footer />            

        </>

    );

}

export default HotelList;