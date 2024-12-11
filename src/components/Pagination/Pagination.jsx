import React from "react";
import styles from "./Pagination.module.css"; // CSS Module for styling

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const delta = 2; // Number of pages around the current page to display

        // Helper to add page number or ellipsis
        const addPage = (page) => {
            pageNumbers.push(
                <button key={page} onClick={() => handlePageClick(page)} className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}>
                    {page}
                </button>
            );
        };

        let leftBoundary = Math.max(currentPage - delta, 1);
        let rightBoundary = Math.min(currentPage + delta, totalPages);

        // Display the first page
        if (leftBoundary > 1) {
            addPage(1);
            if (leftBoundary > 2) {
                pageNumbers.push(
                    <span key="left-ellipsis" className={styles.ellipsis}>
                        ...
                    </span>
                );
            }
        }

        // Display pages around the current page
        for (let i = leftBoundary; i <= rightBoundary; i++) {
            addPage(i);
        }

        // Display the last page
        if (rightBoundary < totalPages) {
            if (rightBoundary < totalPages - 1) {
                pageNumbers.push(
                    <span key="right-ellipsis" className={styles.ellipsis}>
                        ...
                    </span>
                );
            }
            addPage(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className={styles.paginationContainer}>
            <button onClick={handlePrevious} className={`${styles.pageButton} ${styles.navButton}`} disabled={currentPage === 1}>
                Previous
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} className={`${styles.pageButton} ${styles.navButton}`} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
