import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, fetchCategoryById, fetchAllCategory , addProducts} from "../redux/slices/CategoriesSlice.jsx";
import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";

function HomePage() {
    const dispatch = useDispatch();

    // Kategori bilgileri için state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // Ürün bilgileri için state
    const [productData, setProductData] = useState({
        size: "",
        name: "",
        material: "",
        brand: "",
        price: 0,
        categoryId: 1
    });

    const category = useSelector((state) => state.categories.category);
    const allCategory = useSelector((state) => state.categories.allCategories);

    // Burası kategori işlemleri için yapılan fonksiyon
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (name && description) {
            console.log("Gönderilen Kategori:", { name, description });
            dispatch(addCategory({ name, description }));
            setName("");
            setDescription("");
        } else {
            alert("İsim ve açıklama gerekli!");
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        console.log("Gönderilen Ürün:", productData);
        // Ürün verisini göndermek için dispatch ile ilgili bir action eklenebilir
        setProductData({ size: "", name: "", material: "", brand: "", price: 0 });
        dispatch(addProducts(productData))
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchCategory = async () => {
            if (category.id) {
                await dispatch(fetchCategoryById(category.id));
            }
        };

        fetchCategory();
    }, [dispatch, category.id]);

    return (
        <Container className="container">
            <h2>Kategori Ekle</h2>
            <Form onSubmit={handleCategorySubmit}>
                <Form.Group className="mb-3" controlId="categoryName">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Kategori giriniz..."
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="categoryDescription">
                    <Form.Label>Açıklamayı giriniz</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ekle
                </Button>
            </Form>

            <h2>Ürün Ekle</h2>
            <Form onSubmit={handleProductSubmit}>
                <Form.Group className="mb-3" controlId="productSize">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Size giriniz..."
                        name="size"
                        value={productData.size}
                        onChange={handleProductChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productName">
                    <Form.Label>Ürün Adı</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ürün adı giriniz..."
                        name="name"
                        value={productData.name}
                        onChange={handleProductChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productMaterial">
                    <Form.Label>Malzeme</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Malzeme giriniz..."
                        name="material"
                        value={productData.material}
                        onChange={handleProductChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productBrand">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Marka giriniz..."
                        name="brand"
                        value={productData.brand}
                        onChange={handleProductChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>Fiyat</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Fiyat giriniz..."
                        name="price"
                        value={productData.price}
                        onChange={handleProductChange}
                    />
                </Form.Group>
                <Form.Group controlId="productCategoryId">
                    <Form.Label>Kategori Seçin</Form.Label>
                    <Form.Control
                        as="select"
                        name="categoryId"
                        value={productData.categoryId}
                        onChange={handleProductChange}
                    >
                        {allCategory.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Ürün Ekle
                </Button>
            </Form>

            <div>
                <h2>Kategoriler</h2>
                <div>{category.name}</div>
                <div>{category.description}</div>
            </div>


            <button onClick={() => dispatch(fetchCategoryById(1))}>Kategori Getir</button>
            <button onClick={() => dispatch(fetchAllCategory())}>Bütün Kategorileri Getir</button>
        </Container>
    );
}

export default HomePage;
