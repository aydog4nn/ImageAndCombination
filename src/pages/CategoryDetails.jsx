import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { useParams} from "react-router-dom";
import {
    fetchCategoryById,
    fetchProductsByCategoryId,
    selectCategoryById,
    selectedProductsByCategory
} from "../redux/slices/CategoriesSlice.jsx";

function CategoryDetails() {

    const {id} = useParams();

    const dispatch = useDispatch();
    const category = useSelector((state) => state.categories.selectedCategory);
    const products = useSelector((state) => state.categories.categoryProducts);

    useEffect(() => {

        dispatch(fetchCategoryById(id))

        dispatch(fetchProductsByCategoryId(id))
    }, [dispatch, id]);


    if (!category) return <div>Loading..</div>
    return (
        <div>
            <h1>{category.name}</h1>
            <h3>{category.description}</h3>
            <h2>Products:</h2>

            {products && products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
            )}

        </div>
    )
}


export default CategoryDetails;