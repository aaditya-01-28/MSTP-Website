import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdminPagination = ({ currentPage = 1, totalItems = 0, pageSize = 10, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with intelligent windowing
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="admin-pagination-wrapper">
      <div className="pagination-info">
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> entries
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn nav-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <div className="pagination-numbers">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`dots-${index}`} className="pagination-dots">
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                type="button"
                className={`pagination-btn num-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="pagination-btn nav-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next Page"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
