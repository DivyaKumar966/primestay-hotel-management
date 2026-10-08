import { useState } from "react";

function SearchBar({ onSearch }) {

    const [title, setTitle] = useState("");

    const handleSearch = () => {
        onSearch(title);
    };

    return (
        <div className="search-box">

            <div className="search-input-wrapper">

                <span>⌕</span>

                <input type="text"placeholder="Search hotels by name..."value={title}onChange={(e) =>
                    setTitle(e.target.value)} />
            </div>

            <button
                className="search-button"
                onClick={handleSearch}>
                Search
            </button>

        </div>
    );
}

export default SearchBar;