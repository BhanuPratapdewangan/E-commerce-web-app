import logo from './logo.svg';
import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeShopper from './components/home-shopper/home-shopper.js';
import CategoryShopping from './components/category-shopper/category-shopper.js';
import DetailsShopper from './components/details-shopper/details-shopper.js';
import InvalidShopper from './components/invalid-shopper/invalid-shopper.js';
import RegisterShopper from './components/register-shopper/register-shopper.js';
import LoginShopper from './components/login-shopper/login-shopper.js';
import PrivateShopper from './components/private-shooper/private-shooper.js';
import IndexShopper from './components/index-shopper/index-shopper.js';
import CrudIndex from './crud-operation/crud-index.js';
import CrudCreate from './crud-operation/crud-create.js';
import CrudDetails from './crud-operation/crud-details.js';
import CrudUpdate from './crud-operation/crud-update.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <IndexShopper/>
          <Routes>
              {/* <Route element={<PrivateShopper />}>
                <Route path="/" element={<HomeShopper/>} />
                <Route path="category/:catname" element={<CategoryShopping/>} /> */}
                {/* <Route path="details/:id" element={<DetailsShopper/>} />
              </Route> */}

              <Route path="category/:catname" element={<CategoryShopping/>} />
              <Route path="details/:id" element={<DetailsShopper/>} />
              <Route path="home" element={<HomeShopper/>} />  
              <Route path="register" element={<RegisterShopper/>} />
              <Route path="login" element={<LoginShopper/>} />
              <Route path="invalid" element={<InvalidShopper/>} />
              <Route path="productgrid" element={<CrudIndex/>} />
              <Route path="addproducts" element={<CrudCreate/>} />
              <Route path="cruddetails/:id" element={<CrudDetails/>} />
              <Route path="crudupdate/:id" element={<CrudUpdate/>} />
          </Routes>
        </nav>
        </BrowserRouter>
    </div>
  );
}

export default App;
