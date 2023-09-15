import React from 'react';
import { useAppDispatch } from '../../redux/store';

import ReactPaginate from 'react-paginate';
import styles from '../../scss/components/pagination.module.scss';
import { setPage } from '../../redux/slices/filterSlice';

export const Pagination:React.FC = () => {
  const dispatch = useAppDispatch();
  const setCurrentPage = (num:number) => dispatch(setPage(num));
  
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
