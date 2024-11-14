import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, fetchCategoryById, fetchAllCategory,} from "../redux/slices/CategoriesSlice.jsx";
import {addProducts, fetchAllProduct, fetchProductsById} from "../redux/slices/ProductSlice.jsx";
import Form from "react-bootstrap/Form";
import {Button, Container} from "react-bootstrap";
import CategoryDetails from "./CategoryDetails.jsx";
import images from "../images/indeksModel-Photoroom.png"
import images2 from "../images/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-web-site-social-media-mobile-app-ui-illustration-free-vector-Photoroom.png"

function HomePage() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [productData, setProductData] = useState({
        size: "", name: "", material: "", brand: "", price: 0, categoryId: 1
    });

    const category = useSelector((state) => state.categories.category);
    const allCategory = useSelector((state) => state.categories.allCategories);
    const allProducts = useSelector(state => state.products.allProducts)

    // Burası kategori işlemleri için yapılan fonksiyon
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (name && description) {
            console.log("Gönderilen Kategori:", {name, description});
            dispatch(addCategory({name, description}));
            setName("");
            setDescription("");
        } else {
            alert("İsim ve açıklama gerekli!");
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        console.log("Gönderilen Ürün:", productData);
        setProductData({size: "", name: "", material: "", brand: "", price: 0});
        dispatch(addProducts(productData))
    };

    const handleProductChange = (e) => {
        const {name, value} = e.target;
        setProductData((prevData) => ({
            ...prevData, [name]: value,
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

        <div style={{width: "100%"}}>

            {/*<div style={{*/}
            {/*    display: "flex",*/}
            {/*    alignItems: "center",*/}
            {/*    justifyContent: "center",*/}
            {/*    width: "80%",*/}
            {/*    margin: "0 auto"*/}
            {/*}}>*/}
            {/*    <div style={{*/}
            {/*        width: "45%",*/}
            {/*        height: "350px",*/}
            {/*        display: "flex",*/}
            {/*        alignItems: "center",*/}
            {/*        justifyContent: "center",*/}
            {/*        backgroundColor:"#376642",*/}
            {/*        borderRight: "2px solid #f7e7d4",*/}
            {/*        borderRadius:"10px"*/}
            {/*    }}>Ahmet*/}
            {/*    </div>*/}
            {/*    <div style={{*/}
            {/*        width: "45%",*/}
            {/*        height: "350px",*/}
            {/*        display: "flex",*/}
            {/*        alignItems: "center",*/}
            {/*        justifyContent: "center",*/}
            {/*        backgroundColor:"#654520",*/}
            {/*        borderRadius:"10px"*/}
            {/*    }}>Eda*/}
            {/*    </div>*/}

            {/*</div>*/}


            <div style={{
                backgroundColor: "#f7e7d4", padding: "0px", margin: "0px"
            }} className=" w-100 d-flex justify-content-around align-items-center">
                <div style={{
                    width:"10%",
                    display:"flex",
                    flexDirection:"column",
                    gap:"20px"
                }}>
                    <div style={{
                        marginLeft: "50px",
                        borderRadius: "50%",
                        width: "100px",
                        backgroundColor: "#f9ead9",
                        height: "100px",
                        padding: "0px",
                    }}>
                        <img style={{
                            width:"100px",
                            height:"100px",
                        }} src={images2} alt=""/>
                    </div>
                    <div style={{
                        marginLeft:"50px",
                        borderRadius:"50%",
                        width:"100px",
                        height:"100px",
                        backgroundColor:"#376642"
                    }}></div>
                    <div style={{
                        marginLeft:"50px",
                        borderRadius:"50%",
                        width:"100px",
                        height:"100px",
                        backgroundColor:"#376642"
                    }}></div>
                    <div style={{
                        marginLeft:"50px",
                        borderRadius:"50%",
                        width:"100px",
                        height:"100px",
                        backgroundColor:"#376642"
                    }}></div>
                </div>
                <img style={{
                    display: "block",
                    maxWidth: "100%",
                    height: "auto",
                    margin: 0,
                    paddingTop: "40px",
                    paddingLeft: "40px",

                }} src={images} alt="model"/>

                <div style={{
                    paddingLeft: "20px",
                    width: "30%",
                    border: "1px solid black",
                    height:"100%"
                }}>
                    <h1 style={{
                        fontSize: "40px",
                        textWrap: "wrap",
                        textTransform: "uppercase",
                        fontFamily: "'Platypi', 'serif'"
                    }}>
                        Yapay Zeka ile Tarzını Keşfet ve Kendi Modanı Yarat!
                    </h1>
                </div>
            </div>

            <div style={{
                height: "500px", backgroundColor: "red"
            }}></div>


            {/*<h2>Kategori Ekle</h2>*/}
            {/*<Form onSubmit={handleCategorySubmit}>*/}
            {/*    <Form.Group className="mb-3" controlId="categoryName">*/}
            {/*        <Form.Label>Kategori</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            value={name}*/}
            {/*            onChange={(e) => setName(e.target.value)}*/}
            {/*            type="text"*/}
            {/*            placeholder="Kategori giriniz..."*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </Form.Group>*/}
            {/*    <Form.Group className="mb-3" controlId="categoryDescription">*/}
            {/*        <Form.Label>Açıklamayı giriniz</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            value={description}*/}
            {/*            onChange={(e) => setDescription(e.target.value)}*/}
            {/*            as="textarea"*/}
            {/*            rows={3}*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </Form.Group>*/}
            {/*    <Button variant="primary" type="submit">*/}
            {/*        Ekle*/}
            {/*    </Button>*/}
            {/*</Form>*/}

            {/*<h2>Ürün Ekle</h2>*/}
            {/*<Form onSubmit={handleProductSubmit}>*/}
            {/*    <Form.Group className="mb-3" controlId="productSize">*/}
            {/*        <Form.Label>Size</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            type="text"*/}
            {/*            placeholder="Size giriniz..."*/}
            {/*            name="size"*/}
            {/*            value={productData.size}*/}
            {/*            onChange={handleProductChange}*/}
            {/*        />*/}
            {/*    </Form.Group>*/}

            {/*    <Form.Group className="mb-3" controlId="productName">*/}
            {/*        <Form.Label>Ürün Adı</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            type="text"*/}
            {/*            placeholder="Ürün adı giriniz..."*/}
            {/*            name="name"*/}
            {/*            value={productData.name}*/}
            {/*            onChange={handleProductChange}*/}
            {/*        />*/}
            {/*    </Form.Group>*/}

            {/*    <Form.Group className="mb-3" controlId="productMaterial">*/}
            {/*        <Form.Label>Malzeme</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            type="text"*/}
            {/*            placeholder="Malzeme giriniz..."*/}
            {/*            name="material"*/}
            {/*            value={productData.material}*/}
            {/*            onChange={handleProductChange}*/}
            {/*        />*/}
            {/*    </Form.Group>*/}

            {/*    <Form.Group className="mb-3" controlId="productBrand">*/}
            {/*        <Form.Label>Marka</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            type="text"*/}
            {/*            placeholder="Marka giriniz..."*/}
            {/*            name="brand"*/}
            {/*            value={productData.brand}*/}
            {/*            onChange={handleProductChange}*/}
            {/*        />*/}
            {/*    </Form.Group>*/}

            {/*    <Form.Group className="mb-3" controlId="productPrice">*/}
            {/*        <Form.Label>Fiyat</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            type="number"*/}
            {/*            placeholder="Fiyat giriniz..."*/}
            {/*            name="price"*/}
            {/*            value={productData.price}*/}
            {/*            onChange={handleProductChange}*/}
            {/*        />*/}
            {/*    </Form.Group>*/}
            {/*    <Form.Group controlId="productCategoryId">*/}
            {/*        <Form.Label>Kategori Seçin</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            as="select"*/}
            {/*            name="categoryId"*/}
            {/*            value={productData.categoryId}*/}
            {/*            onChange={handleProductChange}*/}
            {/*        >*/}
            {/*            {allCategory.map((category) => (*/}
            {/*                <option key={category.id} value={category.id}>*/}
            {/*                    {category.name}*/}
            {/*                </option>*/}
            {/*            ))}*/}
            {/*        </Form.Control>*/}
            {/*    </Form.Group>*/}
            {/*    <Button variant="primary" type="submit">*/}
            {/*        Ürün Ekle*/}
            {/*    </Button>*/}
            {/*</Form>*/}

            {/*<div>*/}
            {/*    <h2>Kategoriler</h2>*/}
            {/*    <div>{category.name}</div>*/}
            {/*    <div>{category.description}</div>*/}
            {/*</div>*/}


            {/*<button onClick={() => dispatch(fetchCategoryById(1))}>Kategori Getir</button>*/}
            {/*<button onClick={() => dispatch(fetchAllCategory())}>Bütün Kategorileri Getir</button>*/}
            {/*<button onClick={() => dispatch(fetchAllProduct())}>Bütün Ürünleri Al</button>*/}
            {/*<button onClick={() => dispatch(fetchProductsById(5))}>urun al</button>*/}
        </div>);
}

export default HomePage;
