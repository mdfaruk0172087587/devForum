import React from 'react';
import ReactPaginate from 'react-paginate';


const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  if(!pageCount || pageCount < 1) return null
  return (
    <div className='flex justify-center mt-6'>
      <ReactPaginate
         forcePage={Math.min(currentPage - 1, pageCount - 1)}
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(selectedItem) => {
          onPageChange(selectedItem.selected + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        containerClassName={'pagination flex flex-wrap justify-center gap-1'}
        pageClassName={'border border-white px-2 py-1 text-grin'}
        activeClassName={'bg-white text-blue-800 font-bold'}
        previousClassName={'text-grin px-2'}
        nextClassName={'text-grin px-2'}
        breakClassName={'text-grin px-2'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
    </div>
  );
};

export default Pagination;
