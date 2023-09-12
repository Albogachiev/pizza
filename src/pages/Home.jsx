import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import qs  from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Categories } from '../components/Categories';
import { Sort, list } from '../components/Sort';
import { Pagination } from '../components/Pagination/Pagination';

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setIdCategories = (id) => dispatch(setCategoryId(id));
  const setCurrentPage = (num) => dispatch(setCurrentPage(num));
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const currenPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.filter.search);
  const idCategpries = useSelector((state) => state.filter.categoryId);
  const sortData = useSelector((state) => state.filter.sort.sort); 
  const {items, status} = useSelector((state) => state.pizza);
  
    const idCat = idCategpries > 0 ? `${idCategpries}` : '';
    //const searchUrl = searchValue ? `&search=${searchValue}` : ''; 

    React.useEffect(() => {
      if(window.location.search){ 
        const params = qs.parse(window.location.search.substring(1));
        const sortFilt = list.find((obj) => obj.sort == params.sortBy);
        
        dispatch(setFilters({
          ...params,
          sortFilt
        }))
        isSearch.current = true;
      }
    },[])

    async function getDataUrl(){
        if(!isSearch.current){
          dispatch(fetchPizzas({
            currenPage,
            idCat,
            sortData,
          }))
        }
        isSearch.current = false;
    }
  
    React.useEffect(() => {
      window.scrollTo(0,0)
      getDataUrl()
    },[idCategpries,sortData,searchValue,currenPage]);
    
    React.useEffect(() => {
      if(isMounted.current){
        let qsData = qs.stringify({
          page:String(currenPage),
          category:String(idCat),
          sortBy:sortData
        })
        navigate(`?${qsData}`) 
      }
      isMounted.current = true;
    },[idCategpries,sortData,currenPage])

    const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);
    const filteredItems = items.filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    const itemsData = filteredItems.map((el, i) => <Link to={`fullPizza/${el.id}`} key={i} ><PizzaBlock {...el} /> </Link>);

  return (
    <>
<div className="container">
    <div className="content__top">
         <Categories setIdCategories={(i) => setIdCategories(i)} idCategpries={idCategpries} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? 
        (<div className='content__error-info'>
                <span>😕</span>
            <h2>К сожалению, произошла ошибка</h2>
            <p className='description'>Не получилось загрузить пиццы, повторите попытку позже</p>
           
          </div>)             :
        <div className="content__items">
          {status === 'loading' 
                ? skeleton
                : itemsData}
        </div>}
        <Pagination />
</div>
    </>
  )
}
