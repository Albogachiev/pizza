import React from 'react';
import axios from 'axios';

import './scss/app.scss';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock/PizzaBlock';
import { Skeleton } from './components/PizzaBlock/Skeleton'

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async function(){ 
    await axios.get('https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza')
    .then((el) => setItems(el.data))
      setIsLoading(false)
  })()
  },[]);

  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <div className="content__top">
         <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading 
                ? [...Array(8)].map((_, i) => <Skeleton key={i} />)
                : items.map((el, i) => <PizzaBlock key={i} {...el} />)}
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
