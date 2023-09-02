import React from 'react';
import axios from 'axios';

import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';

export function Home({searchValue}) {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [idCategpries, setIdCategories] = React.useState(0);
    const [typeSort, setTypeSort] = React.useState({name:'популярности', sort:'rating'});

    const idCat = idCategpries > 0 ? `${idCategpries}` : '';
    const sort = typeSort.sort;
    //const searchUrl = searchValue ? `&search=${searchValue}` : '';
  
    React.useEffect(() => {
      setIsLoading(true)
      axios.get(`https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza?category=${idCat}&sortBy=${sort}`)
      .then((el) => {
        setItems(el.data)
        setIsLoading(false)
      })
      window.scrollTo(0,0)
    },[idCategpries,typeSort]);

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
          <Sort typeSort={typeSort} setTypeSort={(i) => setTypeSort(i)}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading 
                ? skeleton
                : itemsData}
        </div>
</div>
    </>
  )
}
