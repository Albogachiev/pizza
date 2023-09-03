import React from 'react';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../../scss/components/search.module.scss';
import { searchInput } from '../../redux/slices/filterSlice';

export function Search() {
  const [valueForInput, setValueForInput] = React.useState('');
  const inputRef = React.useRef();
  const dispatch = useDispatch();

  const setSearchValue = (data) => dispatch(searchInput(data));
  const searchValue = useSelector((state) => state.filter.search);
  
  const inputDebounce = React.useCallback(
    debounce((data) => {
      setSearchValue(data)
    }, 200),
    []
  )

  const changeInput = (data) => {
    setValueForInput(data)
    inputDebounce(data)
  }

  function clearInput(){
    setSearchValue('')
    setValueForInput('')
    inputRef.current.focus()
  }
  return (
    <div className={styles.root} >

      <svg  className={styles.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>

      <input ref={inputRef} value={valueForInput} onChange={(event) => changeInput(event.target.value)} className={styles.input} placeholder='Поиск пиццы..' type='text' />
    {searchValue && 
      <svg onClick={clearInput} className={styles.iconClouse} height="512px" id="Layer_1"  version="1.1" viewBox="0 0 512 512" width="512px">
      <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
    }
   
    </div>
  )
}
