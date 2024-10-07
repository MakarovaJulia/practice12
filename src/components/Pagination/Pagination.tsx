import React from 'react';

interface PaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage }) => {
  return (
    <div>
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={() => setPage(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;