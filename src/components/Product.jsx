import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import picture from "./rabiafotoğraf5.png"

function Product( {product} ) {
    if (!product) {
        return <div>Ürün bulunamadı</div>; // veya başka bir yüklenme durumu mesajı
    }


    const {id,name,size,material,brand,price} = product;
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/products/${id}`)}
            sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="180"
                    image={picture}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Product;