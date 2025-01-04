import  {useEffect} from 'react';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Typography,
    Grid,
    IconButton,
    Container,
    Divider,
    Stack,
    Select,
    MenuItem
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllProduct, fetchProductsById} from "../redux/slices/ProductSlice.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "./Loading.jsx";

function ProductDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams()
    const selectedProduct = useSelector((state) => state.products.selectedProduct);
    const allProducts = useSelector((state) => state.products.allProducts);
    const loading = useSelector((state) => state.products.loading);
    useEffect(() => {
        dispatch(fetchAllProduct())
        dispatch(fetchProductsById(id))
    }, [dispatch,id]);

    if (loading) return <Loading />

    return (
        <Container maxWidth="lg">

                    <Box key={selectedProduct.id} mt={4}>
                        {/* Sol tarafta ürün resmi */}
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="500"
                                        image={`http://localhost:8080/api/products/file/${selectedProduct.imageName}`} // Resim URL'sini buraya ekleyin.
                                        alt="Light Gray Top"
                                    />
                                </Card>
                            </Grid>

                            {/* Sağ tarafta Ürün Bilgisi */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={2}>
                                    <Typography variant="h5" component="h1">
                                        {selectedProduct.name}
                                    </Typography>
                                    <Typography variant="h4" color="success">
                                        {selectedProduct.price} TL
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Light gray solid Top, has a boat neck, 3/4 sleeves
                                    </Typography>

                                    {/* Beden Seçimi */}
                                    <Box>
                                        <Typography variant="body2">Select Size:</Typography>
                                        <Select defaultValue={selectedProduct.size} fullWidth>
                                            <MenuItem value="S">S</MenuItem>
                                            <MenuItem value="M">M</MenuItem>
                                            <MenuItem value="L">L</MenuItem>
                                            <MenuItem value="XL">XL</MenuItem>
                                        </Select>
                                    </Box>

                                    {/* Butonlar */}
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" color="success" startIcon={<AddShoppingCartIcon/>}>Sepete ekle</Button>
                                        <IconButton color="success">
                                            <FavoriteBorderIcon/>
                                        </IconButton>
                                    </Stack>

                                    <Divider/>
                                    <Typography variant="caption" color="text.secondary">
                                        Wind & Shine, Softwear <br/>
                                        Material: Cotton <br/>
                                        Machine Wash
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>


            {/* Ana Sayfa Kutusu */}


            {/* Benzer Ürünler Bölümü */}
            <Box  mt={6}>
                <Typography variant="h6" mb={2}>Benzer ürünler</Typography>
                <Grid container spacing={2}>
                    {[...allProducts]
                        .filter(item => item.gender === selectedProduct.gender)
                        .sort(() => Math.random() - 0.5)
                        .slice(0,4)
                        .map((item) => (
                        <Grid  item xs={6} sm={3} key={item.id}>
                            <Card onClick={() => navigate(`/products/${item.id}`)} sx={{
                                cursor:"pointer",
                            }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={`http://localhost:8080/api/products/file/${item.imageName}`}
                                    alt={`Product ${item}`}
                                />
                                <Box p={1}>
                                    <Typography variant="body2">Product {item.name}</Typography>
                                    <Typography variant="subtitle2" color="primary">₺{ item.price }</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <div style={{
                height:"100px"
            }}></div>
        </Container>
    );
}

export default ProductDetails;
