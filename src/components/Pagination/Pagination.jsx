import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../scss/components/pagination.module.scss';

export function Pagination({setCurrentPage}) {
  return (
    <>
    {/* <Items currentItems={currentItems} /> */}
    <ReactPaginate
    className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  </>
  )
}
