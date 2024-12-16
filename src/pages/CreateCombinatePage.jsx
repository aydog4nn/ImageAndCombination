import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, fetchProductsByPersonal } from '../redux/slices/AdviceSlice'; // Redux slice'ını import ediyoruz
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { useState as useLikeState } from "react";

function CreateCombinatePage() {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);

    // Redux'tan gelen veriyi alıyoruz
    const { personalProducts, loading, error } = useSelector((state) => state.advice);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedImage) {
            const userID = localStorage.getItem('userID'); // Kullanıcı ID'sini localStorage'dan alıyoruz
            dispatch(uploadImage({ imageFile: selectedImage, id: userID })); // Resmi Redux'a gönderiyoruz
        } else {
            console.log("Lütfen bir resim seçin!");
        }
    };

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            dispatch(fetchProductsByPersonal(userID)); // Kullanıcıya ait ürünleri çekiyoruz
        }
    }, [dispatch]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', flexDirection: "column" }}>
            <div style={{ width: '60%' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        marginTop: '20px',
                        fontFamily: 'Arial, sans-serif',
                    }}>
                        {/* Dosya Seç Butonu */}
                        <label htmlFor="fileInput" style={{
                            cursor: 'pointer',
                            padding: '12px 30px',
                            backgroundColor: '#376642',
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: '16px',
                            transition: 'background-color 0.3s ease',
                        }}>
                            Resim Seç
                        </label>
                        <input
                            style={{
                                display: 'none',
                            }}
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {/* Resim Önizleme */}
                        {selectedImage && (
                            <div style={{
                                width: '40%',
                                height: '60%',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '20px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            }}>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Yüklenen Fotoğraf"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        )}

                        {/* Yükle Butonu */}
                        <button style={{
                            padding: '12px 30px',
                            backgroundColor: '#000',
                            color: 'white',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 0.3s ease',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                                type="submit">
                            Kombin Öner
                        </button>
                    </div>
                </form>
            </div>

            {/* Ürün Kartlarını Listele */}
            {loading ? (
                <p>Yükleniyor...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {personalProducts.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

function Product({ product }) {
    if (!product) {
        return <div>Ürün bulunamadı</div>;
    }

    const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black"];
    const { id, name, size, material, brand, price, imageName } = product;
    const navigate = useNavigate();
    const [liked, setLiked] = useLikeState(false); // Favori durumu için state

    const handleLike = () => {
        setLiked(!liked); // Favori durumunu değiştir
    };

    return (
        <Card
            onClick={() => navigate(`/products/${id}`)}
            sx={{ width: 370, height: 600 }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="500"
                    image={imageName ? `http://localhost:8080/api/products/file/${imageName}` : "http://localhost:8080/api/products/file/product_2_05435615-152f-45d0-b756-4219f563f306.jpg"}
                    alt={name}
                />
                <CardContent style={{
                    textAlign: "center",
                    fontSize: "5px",
                }}>
                    <Typography style={{
                        textTransform: "uppercase",
                        fontFamily: "'Platypi', 'serif'"
                    }} gutterBottom variant="caption" component="div">
                        {name}
                    </Typography>

                    <Typography style={{
                        textTransform: "uppercase",
                        fontFamily: "'Platypi', 'serif'",
                        fontWeight: "bolder"
                    }} variant="body2">
                        {price},00 TL
                    </Typography>

                    {/* Favori ikonu */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation(); // Kartın tıklanmasını engellemek için
                            handleLike();
                        }}
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            padding: "10px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: liked ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <FavoriteIcon style={{ color: liked ? "red" : "black" }} />
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
    );
}

export default CreateCombinatePage;
