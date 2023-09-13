import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Cart } from './components/Cart/Cart';
import { FullPizza } from './components/FullPizza.tsx/FullPizza';


function App() {
  
  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/fullPizza/:id' element={<FullPizza />} />
        <Route path='*' element={<NotFound />} />
      </Routes> 
    </div>
  </div>
  );
}

export default App;
