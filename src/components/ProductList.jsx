import {fetchAllProduct} from "../redux/slices/ProductSlice.jsx";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Product from "./Product.jsx";


function ProductList() {

    const dispatch = useDispatch();
    const {allProducts} = useSelector(state => state.products);


    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    return (

        <div className="d-flex gap-4 justify-content-center mt-5 " style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "wrap",
            marginTop: "70px",
        }}>

            <div className="gap-4 mt-5" style={{
                display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap",
            }}>

                {allProducts.length > 0 ? (
                    allProducts.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))
                ) : <p>Bu kategoriye ait ürün bulunmamaktadir.</p>}
            </div>


        </div>)


}

export default ProductList;