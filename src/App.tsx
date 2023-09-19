import React, { Suspense }  from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';

const Cart = React.lazy(() => import(/*webpackChunkName:'Cart'*/'./components/Cart/Cart'));
const NotFound = React.lazy(() => import(/*webpackChunkName:'NotFound'*/'./pages/NotFound'));
const FullPizza = React.lazy(() => import(/*webpackChunkName:'FullPizza'*/'./components/FullPizza.tsx/FullPizza'));

function App() {
  
  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/cart' element={
        <Suspense fallback={<div>Загрузка...</div>}>
        <Cart />
        </Suspense>
      } />

        <Route path='/fullPizza/:id' element={
      <Suspense fallback={<div>Загрузка...</div>}>
        <FullPizza />
      </Suspense>
        } />

        <Route path='*' element={
         <Suspense fallback={<div>Загрузка...</div>}>
           <NotFound />
         </Suspense>
           } />

      </Routes> 
    </div>
  </div>
  );
}

export default App;
