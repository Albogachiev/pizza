import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import qs  from 'qs';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/store';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Categories } from '../components/Categories';
import { Sort, list } from '../components/Sort';
import { Pagination } from '../components/Pagination/Pagination';

type FilterNotFound = {
  title:string;
  id:string;
  price:number;
  imageUrl:string;
  types:number[];
  sizes:number[];
};

export const Home:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const setIdCategories = (id:number) => dispatch(setCategoryId(id));
  // const setCurrentPage = (num:number) => dispatch(setCurrentPage(num));
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const currenPage = useSelector((state:RootState) => state.filter.currentPage);
  const searchValue = useSelector((state:RootState) => state.filter.search);
  const idCategpries = useSelector((state:RootState) => state.filter.categoryId);
  const sortData = useSelector((state:RootState) => state.filter.sort); 
  const {items, status} = useSelector((state:RootState) => state.pizza);
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
            sortData:sortData.sort,
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
            page:currenPage,
            category:idCat,
            sortBy:sortData
          })
          navigate(`?${qsData}`)
      }
        isMounted.current = true;
    },[idCategpries,sortData,currenPage])

    const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);
    const filteredItems = items.filter((obj:{title:string}) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    
    const itemsData = filteredItems.map((el:FilterNotFound, i:number) => <PizzaBlock key={i} {...el} />);

  return (
    <>
<div className="container">
    <div className="content__top">
         <Categories setIdCategories={(i:number) => setIdCategories(i)} idCategpries={idCategpries} />
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
