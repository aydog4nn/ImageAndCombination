import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../redux/slices/CategoriesSlice.jsx";
import { BsTruck, BsBag } from "react-icons/bs";
import { RiAccountBoxLine } from "react-icons/ri";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false); // Drawer kontrolü
    const [isScrolled, setIsScrolled] = useState(false); // Scroll durumunu tutacak state
    const [showTopBar, setShowTopBar] = useState(true); // Üst barın görünürlüğü

    const category = useSelector((state) => state.categories.allCategories);

    useEffect(() => {
        if (!category || category.length === 0) {
            dispatch(fetchAllCategory());
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Scroll pozisyonu 50 pikseli geçtiğinde true yap
            if (window.scrollY > 100) setShowTopBar(false); // Scroll 100px'i geçince üst barı gizle
            else setShowTopBar(true); // Scroll 100px altına inince tekrar göster
        };

        window.addEventListener("scroll", handleScroll); // Scroll eventini dinle
        return () => window.removeEventListener("scroll", handleScroll); // Event listener'ı kaldır
    }, [dispatch, category]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const UnderlinedText = styled.span`
        position: relative;
        color: ${isScrolled ? "#fff" : "#000"};
        text-decoration: none;
        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -7px;
            width: 0;
            height: 2px;
            background-color: ${isScrolled ? "#fff" : "#000"};
            transition: width 0.3s ease, left 0.3s ease;
        }

        &:hover::after {
            width: 100%;
            left: 0;
        }
    `;

    const DrawerList = (
        <Box
            sx={{ width: 550 }}
            style={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                flexDirection: "column",
                padding: "20px",
            }}
        >
            <h4
                style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontFamily: "'Platypi', 'serif'",
                }}
            >
                Senin için önerilenler
            </h4>
            <div
                style={{
                    borderBottom: "2px solid black",
                    width: "90%",
                    marginTop: "10px",
                    marginBottom: "20px",
                }}
            ></div>
            {category &&
                category.map((item, index) => (
                    <div
                        onClick={() => navigate(`/category/${item.id}`)}
                        key={item.id}
                        style={{
                            cursor: "pointer",
                            margin: "10px 0",
                            fontSize: "16px",
                        }}
                    >
                        {index}:{item.name}
                    </div>
                ))}
        </Box>
    );

    return (
        <div>
            {/* Üst bilgilendirme barı */}
            {showTopBar && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "50px",
                        backgroundColor: "#376642",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Geist Mono', monospace",
                        zIndex: 1050, // Kargo barını en üstte tutar
                        transition: "all 0.3s ease",
                    }}
                >
                    <BsTruck
                        style={{
                            fontSize: "30px",
                            color: "#f7e7d4",
                            marginRight: "10px",
                        }}
                    />
                    <h6
                        style={{
                            color: "#f7e7d4",
                            margin: 0,
                        }}
                    >
                        800 TL ve üzeri alışverişlerinizde kargo ücretsiz!
                    </h6>
                </div>
            )}

            {/* Header */}
            <div
                className={`d-flex justify-content-around align-items-center ${
                    isScrolled ? "bg-success" : "bg-light"
                }`}
                style={{
                    position: "fixed",
                    top: showTopBar ? "50px" : "0px", // Üst bar varsa header 50px altında
                    left: 0,
                    width: "100%",
                    height: "70px",
                    zIndex: 1040, // Header'ın kargo barından sonra gelmesini sağlar
                    boxShadow: isScrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                    transition: "all 0.3s ease",
                }}
            >
                {/* Sol Menü */}
                <div
                    className="d-flex justify-content-start align-items-center"
                    style={{
                        gap: "20px",
                        fontFamily: "'Geist Mono', monospace",
                    }}
                >
                    <Button
                        style={{
                            color: isScrolled ? "#fff" : "#000",
                            fontSize: "15px",
                            border: `1px solid ${isScrolled ? "#fff" : "#000"}`,
                            borderRadius: "5px",
                            padding: "5px 25px",
                            backgroundColor: "transparent",
                            transition: "all 0.3s ease",
                        }}
                        onClick={toggleDrawer(true)}
                    >
                        MENU
                    </Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    <UnderlinedText>
                        <h6 style={{ margin: 0 }}>Erkek</h6>
                    </UnderlinedText>
                    <UnderlinedText>
                        <h6 style={{ margin: 0 }}>Kadın</h6>
                    </UnderlinedText>
                </div>

                {/* Orta Logo */}
                <div>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            color: isScrolled ? "#fff" : "#000",
                            transition: "color 0.3s ease",
                        }}
                        onClick={() => navigate("/")}
                        variant="h5"
                    >
                        Diggy&mia
                    </Typography>
                </div>

                {/* Sağ Menüler */}
                <div className="d-flex justify-content-around gap-3 align-items-center fs-5">
                    <div>
                        <TextField
                            id="outlined-basic"
                            size="small"
                            color={isScrolled ? "primary" : "success"}
                            label="Search"
                            variant="outlined"
                        />
                    </div>
                    <div
                        style={{
                            cursor: "pointer",
                            color: isScrolled ? "#fff" : "#000",
                            transition: "color 0.3s ease",
                        }}
                    >
                        <BsBag />
                    </div>
                    <div
                        style={{
                            fontSize: "25px",
                            color: isScrolled ? "#fff" : "#000",
                            transition: "color 0.3s ease",
                        }}
                    >
                        <RiAccountBoxLine />
                    </div>
                </div>
            </div>

            {/* Sayfa İçeriği: Header'ın altından başlamak için padding-top */}
            <div style={{ paddingTop: showTopBar ? "120px" : "70px" }}>
                {/* Buraya sayfanın geri kalan içeriğini yerleştirebilirsiniz */}
                {/* Örneğin, ürün listeleme, kategori gösterimi vs. */}
            </div>
        </div>
    );
}

export default Header;
