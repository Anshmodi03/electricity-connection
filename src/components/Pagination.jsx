// src/components/Pagination.jsx
import React from "react";

// Pagination component to handle page changes
const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
