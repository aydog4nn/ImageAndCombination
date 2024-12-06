import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { useParams} from "react-router-dom";
import {
    fetchCategoryById,
    fetchProductsByCategoryId,
    selectCategoryById,
    selectedProductsByCategory
} from "../redux/slices/CategoriesSlice.jsx";
import Product from "../components/Product.jsx";

function CategoryDetails() {

    const {id} = useParams();

    const dispatch = useDispatch();
    const category = useSelector((state) => state.categories.selectedCategory);
    const products = useSelector((state) => state.categories.categoryProducts);
    console.log(products);
    useEffect(() => {

        dispatch(fetchCategoryById(id))

        dispatch(fetchProductsByCategoryId(id))
    }, [dispatch, id]);


    if (!category) return <div>Loading..</div>
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop:"20px",
        }}>



            {products && products.length > 0 ? (
                <div className="gap-4 mt-5" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}>

                    {products.map((product) => (
                        <Product key={product.id} product={product}/>
                    ))}

                </div>
            ) : (
                <p>No products found.</p>
            )}

        </div>
    )
}


export default CategoryDetails;