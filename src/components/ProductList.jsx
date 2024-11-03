import {fetchAllProduct} from "../redux/slices/ProductSlice.jsx";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import Product from "./Product.jsx";

function ProductList() {

    const dispatch = useDispatch();
    const { allProducts  } = useSelector(state => state.products);
    console.log(allProducts);


    useEffect(() => {
        dispatch(fetchAllProduct());
    },[dispatch]);




    return (
        <div>
            {
                allProducts && allProducts.map((product) => (

                    <Product key={product.id} product={product} />

                ))
            }


        </div>
    )




}

export default ProductList;