import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductsById, setSelectedProduct } from "../redux/slices/ProductSlice.jsx";

function ProductDetails() {
    const { id } = useParams(); // URL'den ürün ID'sini al
    const dispatch = useDispatch();
    const selectedProduct = useSelector((state) => state.products.selectedProduct); // Seçilen ürünü Redux store'dan al

    useEffect(() => {
        dispatch(fetchProductsById(id));
    }, [dispatch, id]);

    if (!selectedProduct) {
        return <p>Yükleniyor...</p>;
    }

    const { name, size, material, brand, price } = selectedProduct;

    return (
        <div>
            <h2>{name}</h2>
            <p>Boyut: {size}</p>
            <p>Malzeme: {material}</p>
            <p>Marka: {brand}</p>
            <p>Fiyat: {price} TL</p>
        </div>
    );
}

export default ProductDetails;
