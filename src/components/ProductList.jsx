import {fetchAllProduct} from "../redux/slices/ProductSlice.jsx";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import Product from "./Product.jsx";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function ProductList() {

    const dispatch = useDispatch();
    const { allProducts  } = useSelector(state => state.products);
    console.log(allProducts);


    useEffect(() => {
        dispatch(fetchAllProduct());
    },[dispatch]);




    return (
        <div className="d-flex gap-4 justify-content-center mt-5 bg-light ">

            {
                allProducts && allProducts.map((product) => (

                    <Product key={product.id} product={product} />

                ))
            }


        </div>
    )




}

export default ProductList;