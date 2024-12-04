import {fetchAllProduct} from "../redux/slices/ProductSlice.jsx";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Product from "./Product.jsx";


function ProductList() {

    const dispatch = useDispatch();
    const {allProducts} = useSelector(state => state.products);
    const [active, setActive] = useState(false);

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
            marginTop: "70px"
            ,
        }}>
            <div  style={{
                fontFamily: "'Platypi', 'serif'",
                fontWeight: "300",
                letterSpacing: "-0.5px",
                fontSize: "16px",
                display: "flex",
                gap:"10px",
                color:"black",

            }}>
                <div onClick={() => setActive(!active)} style={{
                    border: "none",
                    padding:"5px 15px",
                    borderRadius:"10px",
                    backgroundColor: active ? "black" : "#F0F0F0",
                    color: active ? "white" : "black",
                    cursor: "pointer",

                }}>Tümünü Gör</div>
                <div  style={{
                    border: "none",
                    padding:"5px 15px",
                    borderRadius:"10px",

                    backgroundColor: "#F0F0F0",
                    cursor: "pointer"

                }}>Kapüşonlu Sweatshirt</div>
                <div  style={{
                    border: "none",
                    padding:"5px 15px",
                    borderRadius:"10px",

                    backgroundColor:"#F0F0F0",
                    cursor: "pointer"

                }}>Ceket</div>
                <div  style={{
                    border: "none",
                    padding:"5px 15px",
                    borderRadius:"10px",

                    backgroundColor:"#F0F0F0",
                    cursor: "pointer"

                }}>Kazak</div>
                <div  style={{
                    border: "none",
                    padding:"5px 15px",
                    borderRadius:"10px",

                    backgroundColor:"#F0F0F0",
                    cursor: "pointer"

                }}>Tişört</div>
                <div  style={{
                    border: "none",
                    padding:"5px 15px",
                    borderRadius:"10px",

                    backgroundColor:"#F0F0F0",
                    cursor: "pointer"

                }}>Etek</div>
            </div>
            <div className="gap-4 mt-5" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
            }}>

                {
                    allProducts && allProducts.map((product) => (

                        <Product key={product.id} product={product}/>

                    ))
                }
            </div>


        </div>
    )


}

export default ProductList;