function Pagination({currentPage,totalPages, onPageChange}) {

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination">

            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
            >
                Previous
            </button>


            {Array.from(
                { length: totalPages },
                (_, index) => {

                    const page = index + 1;

                    return (
                        <button
                            key={page}
                            className={
                                currentPage === page
                                    ? "active-page"
                                    : ""
                            }
                            onClick={() =>
                                onPageChange(page)}>
                            {page}
                        </button>
                    );
                }
            )}
            <button
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
            >
                Next
            </button>

        </div>
    );
}

export default Pagination;