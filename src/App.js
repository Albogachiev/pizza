import React from 'react';
import axios from 'axios';
import './scss/app.scss';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';

function App() {
  const [categoriesData, setCategoriesData] = React.useState([])

  React.useEffect(() => {
    axios.get('https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza')
    .then((el) => setCategoriesData(el.data))
  },[])

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
          {categoriesData.map((el,i) => (<PizzaBlock title={el.title} 
                                                   price={el.price}
                                                   imageUrl={el.imageUrl}
                                                   sizes={el.sizes}
                                                   types={el.types}
                                                   key={i}  />))}
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
