import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilters } from "../redux/hotelSlice";

function Navbar() {

    const dispatch = useDispatch();

    return (
        <nav className="navbar">

            <h2>PRIME STAY</h2>

            <div className="nav-links">

                <Link
                    to="/"
                    onClick={() => dispatch(resetFilters())}
                >
                    Hotels
                </Link>

                <Link to="/add-hotel">
                    Add Hotel
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;