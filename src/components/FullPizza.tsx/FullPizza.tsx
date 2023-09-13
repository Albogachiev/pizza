import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fullPizzaData } from '../../redux/slices/pizzaSlice';

export function FullPizza(){
    const [pizza, setPizza] = React.useState<{
      imageUrl:string;
      price:number;
      title:string;
    }>();

    const { id } = useParams();
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fullPizzaData(id))
        .then((el) => setPizza(el.payload))
    },[]);

    if(!pizza){
        return ( <div className='container'>
                    <h2>Загрузка...</h2>
                </div>)
    }

  return (
    <div className='container'>
      <h2>{pizza.title}</h2>
    <img src={`${pizza.imageUrl}`} alt='img' />
      <h3>Цена: {pizza.price} </h3> <br />
    <p>традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, 
        сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты.</p>
    </div>
  )
}
