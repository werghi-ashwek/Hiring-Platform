import React from 'react';
import "./Pagination.css";

const Pagination = ({ jobPerPage, totalJobs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='page-nav'>
      <ul className='pag-elt'>
        {pageNumbers.map(number => (
          <li key={number} className='page-number'>
            <a onClick={() => paginate(number)}  >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;