import {useNavigate} from "react-router-dom";



function Product( {product} ) {
    if (!product) {
        return <div>Ürün bulunamadı</div>; // veya başka bir yüklenme durumu mesajı
    }


    const {id,name,size,material,brand,price} = product;
    const navigate = useNavigate();

    return (
        <div>
            <h2>{name}</h2>
            <p>{size}</p>
            <p>{material}</p>
            <p>{brand}</p>
            <p>{price}</p>
            <button onClick={() => navigate(`/products/${id}`)}>Detaya git</button>
        </div>
    )
}

export default Product;