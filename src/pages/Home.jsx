import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux';
import qs  from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Categories } from '../components/Categories';
import { Sort, list } from '../components/Sort';
import { Pagination } from '../components/Pagination/Pagination';

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const setIdCategories = (id) => dispatch(setCategoryId(id));
  const setCurrentPage = (num) => dispatch(setCurrentPage(num));

  const currenPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.filter.search);
  const idCategpries = useSelector((state) => state.filter.categoryId);
  const sortData = useSelector((state) => state.filter.sort.sort); 

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

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
  
    React.useEffect(() => {
      window.scrollTo(0,0)
      if(!isSearch.current){
        setIsLoading(true)
        axios.get(`https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza?page=${currenPage}&limit=4&category=${idCat}&sortBy=${sortData}`)
        .then((el) => {
          setItems(el.data)
          setIsLoading(false)
        })
      }
      isSearch.current = false;
    },[idCategpries,sortData,searchValue,currenPage]);
    
    React.useEffect(() => {
        let qsData = qs.stringify({
          page:String(currenPage),
          category:String(idCat),
          sortBy:sortData
        })
        navigate(`?${qsData}`) 
    },[idCategpries,sortData,currenPage])

    const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);
    const filteredItems = items.filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    const itemsData = filteredItems.map((el, i) => <PizzaBlock key={i} {...el} />);

  return (
    <>

<div className="container">
    <div className="content__top">
         <Categories setIdCategories={(i) => setIdCategories(i)} idCategpries={idCategpries} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading 
                ? skeleton
                : itemsData}
        </div>
        <Pagination />
</div>
    </>
  )
}
