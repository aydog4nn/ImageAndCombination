import {useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {fetchCategoryById , selectCategoryById} from "../redux/slices/CategoriesSlice.jsx";

function CategoryDetails({ id }){
    const dispatch = useDispatch();
    const category = useSelector((state) => selectCategoryById(state,parseInt(id)));

    useEffect(() => {
        if (!category) {
            dispatch(fetchCategoryById(id));
        }

    }, [dispatch, id, category]);

    if (!category)  return <div>Loading...</div>;

    return (
        <div>
            <h1>{category.name}</h1>
            <h1>{category.description}</h1>
        </div>
    )
}


export default CategoryDetails;