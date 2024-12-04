import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from "@mui/material";
import { useState } from "react";

function Product({ product }) {
    if (!product) {
        return <div>Ürün bulunamadı</div>; // veya başka bir yüklenme durumu mesajı
    }

    const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black"];
    const { id, name, size, material, brand, price, imageName } = product;
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false); // Favori durumu için state

    const handleLike = () => {
        setLiked(!liked); // Favori durumunu değiştir
    };

    return (
        <div>
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
                                bottom: "20px", // Alt kısmın biraz üstüne
                                right: "20px", // Sağ tarafta
                                backgroundColor: "white", // Arka plan beyaz
                                borderRadius: "50%",
                                padding: "10px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: liked ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "0 4px 8px rgba(0, 0, 0, 0.1)", // Gölge
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
        </div>
    );
}

export default Product;
