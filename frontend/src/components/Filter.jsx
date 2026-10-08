import { useState } from "react";

function Filter({ onFilter }) {

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleFilter = () => {

        onFilter({ minPrice, maxPrice});

    };

    return (

        <div className="price-filter">

            <input
                type="number"
                placeholder="Minimum price"
                value={minPrice}
                onChange={(e) =>
                    setMinPrice(e.target.value)
                } />

            <input
                type="number"
                placeholder="Maximum price"
                value={maxPrice}
                onChange={(e) =>
                    setMaxPrice(e.target.value)}/>

            <button onClick={handleFilter}>Apply Filter</button>

        </div>
    );
}

export default Filter;