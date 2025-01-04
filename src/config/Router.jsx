import { Routes,Route,  } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import CategoryDetails from "../pages/CategoryDetails.jsx";
import ProductDetails from "../components/ProductDetails.jsx";
import ProductList from "../components/ProductList.jsx";
import CreateCombinatePage from "../pages/CreateCombinatePage.jsx";
import AddProductPage from "../pages/AddProductPage.jsx";
import BasketPage from "../pages/BasketPage.jsx";
import MalePage from "../pages/MalePage.jsx";
import WomanPage from "../pages/WomanPage.jsx";

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
        <Route path="/male" element={<MalePage />} />
        <Route path="/female" element={<WomanPage />} />
    </Routes>
  )
}

export default Router