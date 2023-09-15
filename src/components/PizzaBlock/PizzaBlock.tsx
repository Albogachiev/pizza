import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';

import { addProductCart, CartItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

type PizzaBlockProps = {
  title:string;
  id:string;
  sizes:number[];
  price:number;
  types:number[];
  imageUrl:string;
}

export const PizzaBlock:React.FC<PizzaBlockProps> = ({title, id, sizes, price, types, imageUrl}) => {
  const dispatch = useAppDispatch();
  const [activePizzaButton, setActivePizzaButton] = React.useState<number>(0);
  const [activeSizeButton, setActiveSizaButton] = React.useState<number>(0);
  const addedCartCount = useSelector((state:RootState) => state.cart.items.find((obj) => obj.id === id));
  const count = addedCartCount ? addedCartCount.count : 0;
  const typesPizz:string[] = ['тонкая',  'традиционная'];
  const sizePizz:number[] = [26, 30, 40];
  
function addItemCart(){
  const item:CartItem = {
   id,
   title,
   price,
   imageUrl,
   types:typesPizz[activePizzaButton],
   sizes:sizePizz[activeSizeButton],
   count:0,
  }
  dispatch(addProductCart(item))
}
  return (
    <div className='pizza-block-wrapper'>

       <div className="pizza-block">

<Link to={`fullPizza/${id}`} >
<img
  className="pizza-block__image"
  src={imageUrl}
  alt="Pizza"
/>
</Link>

<h4 className="pizza-block__title">{title}</h4>
<div className="pizza-block__selector">
  <ul>
    {types.map((el, i) => (
      <li key={i} 
          onClick={() => setActivePizzaButton(i)} 
          className={activePizzaButton == i ? 'active' : ''}>{typesPizz[el]}</li>))}
  </ul>
  <ul>
    {sizes.map((el, i) => (
      <li key={i} 
          onClick={() => setActiveSizaButton(i)} 
          className={activeSizeButton == i ? "active" : ''}>{el} см.</li>
    ))}
  </ul>
</div>
<div className="pizza-block__bottom">
  <div className="pizza-block__price">от {price}₽</div>
  <div onClick={addItemCart} className="button button--outline button--add">
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
        fill="white"
      />
    </svg>
    <span>Добавить</span>
   {count > 0 && <i>{count}</i>}
  </div>
</div>
</div> 
    </div>
  )
}
