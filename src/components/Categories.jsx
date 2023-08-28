import React from 'react';

export function Categories() {
  const [colorCat, setColorCat] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onClickCategori = (n) => {
    setColorCat(n)
  }

  return (
    <div className="categories">
    <ul>
      {categories.map((el, i) => (
        <li key={i} onClick={() => onClickCategori(i)} className={colorCat === i ? 'active' : ''}>{el}</li>
      ))}
      <li></li>
    </ul>
  </div>
  )
}
