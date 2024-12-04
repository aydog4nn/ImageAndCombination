import {useEffect, useState} from "react";
import {Container, Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addProducts, fetchAllProduct} from "../redux/slices/ProductSlice";
import ImagePage from "./ImagePage.jsx";

function AddProductPage() {
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.products);

    const [product, setProduct] = useState({
        size: "",
        name: "",
        material: "",
        brand: "",
        price: 0,
        categoryId: "",
    });



    // Formdaki değişiklikleri yakala
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: name === "price" || name === "categoryId" ? Number(value) : value,
        });
    };

    // Ürünü ekleme işlemi
    const handleAddProduct = () => {
        if (!product.name || !product.price || !product.categoryId) {
            alert("Lütfen tüm gerekli alanları doldurun!");
            return;
        }



        console.log("Gönderilen ürün:", product);
        dispatch(addProducts(product));

    };

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);



    const exampleID =  useSelector((state) => state.products.allProducts).length - 1;
    if (exampleID === 0){
        exampleID === 1;
    }

    return (
        <Container>
            <h1>Ürün Ekle</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Ürün Adı</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Ürün adı"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Boyut</Form.Label>
                    <Form.Control
                        type="text"
                        name="size"
                        value={product.size}
                        onChange={handleChange}
                        placeholder="Boyut"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Materyal</Form.Label>
                    <Form.Control
                        type="text"
                        name="material"
                        value={product.material}
                        onChange={handleChange}
                        placeholder="Materyal"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Marka</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        placeholder="Marka"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fiyat</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Fiyat"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Kategori ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        placeholder="Kategori ID"
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={handleAddProduct}
                    disabled={loading}
                >
                    {loading ? "Ekleniyor..." : "Ekle"}
                </Button>
            </Form>
            {product && <ImagePage id={2}/>}
            {error && <p style={{color: "red"}}>Hata: {error}</p>}
        </Container>
    );
}

export default AddProductPage;
