import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice'

import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Pagination } from '../components/Pagination/Pagination';
import { AppContext } from '../App';

export function Home() {
  const dispatch = useDispatch();
  const idCategpries = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort.sort);
  const setIdCategories = (id) => dispatch(setCategoryId(id));

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currenPage, setCurrentPage] = React.useState(1);
    const { searchValue } = React.useContext(AppContext);

    const idCat = idCategpries > 0 ? `${idCategpries}` : '';
    //const searchUrl = searchValue ? `&search=${searchValue}` : '';
  
    React.useEffect(() => {
      setIsLoading(true)
      axios.get(`https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza?page=${currenPage}&limit=4&category=${idCat}&sortBy=${sort}`)
      .then((el) => {
        setItems(el.data)
        setIsLoading(false)
      })
      window.scrollTo(0,0)
    },[idCategpries,sort,searchValue,currenPage]);

    const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);
    const filteredItems = items.filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase())
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
        <Pagination setCurrentPage={setCurrentPage} />
</div>
    </>
  )
}
