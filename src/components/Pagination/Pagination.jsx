import React from 'react';
import styles from './Pagination.module.css'; // CSS Module for styling

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
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`${styles.pageButton} ${
                        i === currentPage ? styles.active : ''
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={handlePrevious}
                className={styles.pageButton}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                className={styles.pageButton}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
