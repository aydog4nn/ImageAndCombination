import { Routes,Route,  } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import ImagePage from '../pages/ImagePage'
import CategoryDetails from "../pages/CategoryDetails.jsx";
import ProductDetails from "../components/ProductDetails.jsx";
import ProductList from "../components/ProductList.jsx";
import CreateCombinatePage from "../pages/CreateCombinatePage.jsx";
import AddProductPage from "../pages/AddProductPage.jsx";
import BasketPage from "../pages/BasketPage.jsx";

function Router() {


  return (
    <Routes>
        <Route path='/home' element={<HomePage/>} />
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/category/:id' element={<CategoryDetails />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/combinate' element={<CreateCombinatePage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/basket" element={<BasketPage />} />
    </Routes>
  )
}

export default Router