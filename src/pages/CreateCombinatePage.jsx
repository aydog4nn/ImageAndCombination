import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByPersonal, uploadImage } from "../redux/slices/AdviceSlice.jsx";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

function CreateCombinatePage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const { personalProducts, loading, error } = useSelector(state => state.advice);
    const [likedProducts, setLikedProducts] = useState([]); // Favori durumu için state

    useEffect(() => {
        if (userID) {
            dispatch(fetchProductsByPersonal(userID)); // Sayfa yüklendiğinde ürünleri al
        }
    }, [dispatch, userID]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedImage) {
            dispatch(uploadImage({ imageFile: selectedImage, id: userID }));
        } else {
            console.log("Lütfen bir fotoğraf seçiniz!");
        }
    };

    const handleLike = (productId) => {
        setLikedProducts((prevLiked) =>
            prevLiked.includes(productId)
                ? prevLiked.filter((id) => id !== productId)
                : [...prevLiked, productId]
        );
    };

    const Product = ({ product }) => {
        if (!product) {
            return <div>Ürün bulunamadı</div>;
        }

        const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black"];
        const { id, name, size, material, brand, price, imageName } = product;

        return (
            <Col key={id} sm={12} md={6} lg={4}>
                <Card className="mb-4">
                    <CardActionArea onClick={() => navigate(`/products/${id}`)}>
                        <CardMedia
                            component="img"
                            height="500"
                            image={imageName ? `http://localhost:8080/api/products/file/${imageName}` : "http://localhost:8080/api/products/file/product_2_05435615-152f-45d0-b756-4219f563f306.jpg"}
                            alt={name}
                        />
                        <CardContent style={{ textAlign: "center", fontSize: "5px" }}>
                            <Typography style={{ textTransform: "uppercase", fontFamily: "'Platypi', 'serif'" }} gutterBottom variant="caption" component="div">
                                {name}
                            </Typography>
                            <Typography style={{ textTransform: "uppercase", fontFamily: "'Platypi', 'serif'", fontWeight: "bolder" }} variant="body2">
                                {price},00 TL
                            </Typography>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation(); // Kartın tıklanmasını engellemek için
                                    handleLike(id);
                                }}
                                style={{
                                    position: "absolute",
                                    bottom: "20px", // Alt kısmın biraz üstüne
                                    right: "20px", // Sağ tarafta
                                    backgroundColor: "white", // Arka plan beyaz
                                    borderRadius: "50%",
                                    padding: "10px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    boxShadow: likedProducts.includes(id) ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "0 4px 8px rgba(0, 0, 0, 0.1)", // Gölge
                                }}
                            >
                                <FavoriteIcon style={{ color: likedProducts.includes(id) ? "red" : "black" }} />
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "4px",
                                marginTop: "10px",
                            }}>
                                {colors.map((color, index) => (
                                    <div style={{
                                        backgroundColor: color, width: "10px",
                                        height: "10px",
                                        border: "none",
                                        borderRadius: "50%",
                                    }} key={index}></div>
                                ))}
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Col>
        );
    };

    return (
        <Container>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>Adımlar</h1>
            <Row>
                {/* Adımlar Sağ Tarafta */}
                <Col md={4} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '5px', background: '#f1f1f1', borderRadius: '10px', textAlign: 'center', fontSize: '14px' }}>
                        <h6>1. Fotoğrafını Yükle</h6>
                    </div>
                    <div style={{ padding: '5px', background: '#f1f1f1', borderRadius: '10px', textAlign: 'center', fontSize: '14px' }}>
                        <h6>2. Yapay Zeka Önerisini Gör</h6>
                    </div>
                    <div style={{ padding: '5px', background: '#f1f1f1', borderRadius: '10px', textAlign: 'center', fontSize: '14px' }}>
                        <h6>3. Ürünleri Seç</h6>
                    </div>
                </Col>

                {/* Fotoğraf Yükleme Alanı */}
                <Col md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        onClick={() => document.getElementById('fileInput').click()}
                        style={{
                            width: '300px',
                            height: '200px',
                            border: '2px dashed #ccc',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        {selectedImage ? (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Yüklenen Fotoğraf"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                            />
                        ) : (
                            <p style={{ fontWeight: 'bold', color: '#888', fontSize: '12px' }}>Fotoğraf yüklemek için tıklayın</p>
                        )}
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </Col>
            </Row>

            {/* Ürünleri Listele */}
            <Row>
                {loading && <p>Ürünler yükleniyor...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {personalProducts && personalProducts.length > 0 ? (
                    personalProducts.map(product => <Product key={product.id} product={product} />)
                ) : (
                    <p>Henüz ürün yok.</p>
                )}
            </Row>
        </Container>
    );
}

export default CreateCombinatePage;
