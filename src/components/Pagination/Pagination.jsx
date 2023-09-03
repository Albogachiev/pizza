import React from 'react';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import styles from '../../scss/components/pagination.module.scss';
import { setPage } from '../../redux/slices/filterSlice';

export function Pagination() {
  const dispatch = useDispatch();
  const setCurrentPage = (num) => dispatch(setPage(num));
  
  return (
    <>
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
