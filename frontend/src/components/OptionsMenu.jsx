import { useState } from "react";
import { Link } from "react-router-dom";

import {
    deleteHotel
} from "../services/hotelApi";

function OptionsMenu({
    hotelId,
    onDelete
}) {

    const [open, setOpen] = useState(false);

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this hotel?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteHotel(hotelId);

            onDelete(hotelId);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="options-menu">

            <button
                className="options-button"
                onClick={(e) => {

                    e.preventDefault();
                    e.stopPropagation();

                    setOpen(!open);

                }}
            >
                ⋮
            </button>


            {open && (

                <div className="options">

                    <Link
                        to={`/edit/${hotelId}`}
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        Edit
                    </Link>


                    <button
                        onClick={(e) => {

                            e.preventDefault();
                            e.stopPropagation();

                            handleDelete();

                        }}
                    >
                        Delete
                    </button>

                </div>

            )}

        </div>
    );
}

export default OptionsMenu;