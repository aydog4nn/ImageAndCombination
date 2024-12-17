import React from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Select,
    MenuItem,
    TextField,
    Divider,
    Card,
    CardMedia,
    CardContent,
    CardActions,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import image1 from "../images/fcd7b930-051c-4288-b824-d114a1370b12.jpeg"
import image2 from "../images/14edf01e-3140-42ef-881c-cecb03f8a4e8.jpeg"

const BasketPage = () => {

    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ backgroundColor: "#f8f9fa", padding: 4, borderRadius: 2 }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography onClick={() => navigate("/products")} variant="body1" color="primary"   sx={{ textDecoration: "none" }}>
                    ← Alışverişe devam et
                </Typography>
                <Typography variant="h5" fontWeight="bold">Alışveriş</Typography>
                <Box>

                    <Typography variant="body2" display="inline">🛒 2</Typography>
                </Box>
            </Box>

            {/* Cart Items */}
            <Card sx={{ display: "flex", mb: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 120, objectFit: "cover" }}
                    image={image1}
                    alt="Sandstone jar"
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <CardContent>
                        <Typography component="div" variant="h6">Kumaş Pantolon</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rahat,esnek ve aynı zamanda kaliteli.
                        </Typography>
                        <Select value="Lightstone" size="small" sx={{ mt: 1, width: "150px" }}>
                            <MenuItem value="Lightstone">Antrasit</MenuItem>
                            <MenuItem value="Darkstone">Lacivert</MenuItem>
                        </Select>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                        <Box>
                            <Button variant="outlined" size="small">-</Button>
                            <TextField value="1" size="small" sx={{ width: "40px", mx: 1, textAlign: "center" }} />
                            <Button variant="outlined" size="small">+</Button>
                        </Box>
                        <Typography variant="h6">149.00 TL</Typography>
                    </CardActions>
                </Box>
            </Card>

            {/* Eiffel Chair */}
            <Card sx={{ display: "flex", mb: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 120, objectFit: "cover" }}
                    image={image2}
                    alt="Eiffel chair"
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <CardContent>
                        <Typography component="div" variant="h6">Deri ceket</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Şık ve modern tasarımıyla
                        </Typography>
                        <Select value="White" size="small" sx={{ mt: 1, width: "150px" }}>
                            <MenuItem value="White">Kahverengi</MenuItem>
                            <MenuItem value="Black">Siyah</MenuItem>
                        </Select>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                        <Box>
                            <Button variant="outlined" size="small">-</Button>
                            <TextField value="1" size="small" sx={{ width: "40px", mx: 1, textAlign: "center" }} />
                            <Button variant="outlined" size="small">+</Button>
                        </Box>
                        <Typography variant="h6">400.00 TL</Typography>
                    </CardActions>
                </Box>
            </Card>

            <Divider />

            {/* Summary */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                <Button variant="contained" color="primary">KOD KULLAN</Button>
                <Box>
                    <Typography variant="body1" fontWeight="bold">Toplam: 549.00 TL</Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                </Box>
            </Box>

            <Box textAlign="center" mt={3}>
                <Button variant="contained" color="success" size="large" fullWidth>Siparişi tamamla</Button>
            </Box>


        </Container>
    );
};

export default BasketPage;
