type CategoriesProps = {
  idCategpries:number;
  setIdCategories:any
}

export const Categories:React.FC <CategoriesProps> = ({idCategpries, setIdCategories}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
    <ul>
      {categories.map((el, i) => (
        <li key={i} 
            onClick={() => setIdCategories(i)} 
            className={idCategpries === i ? 'active' 
                                      : ''}>{el}</li>           
      ))}
    </ul>
  </div>
  )
}
