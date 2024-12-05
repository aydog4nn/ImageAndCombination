import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCategory} from "../redux/slices/CategoriesSlice.jsx";
import {BsTruck, BsBag} from "react-icons/bs";
import {RiAccountBoxLine} from "react-icons/ri";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import MenuImage from "../images/output (23).jpg"
import MenuImage2 from "../images/output (24).jpg"
import MenuImage3 from "../images/output (25).jpg"
import MenuFooterImage from "../images/Alt Başlık.png"

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false); // Drawer kontrolü
    const [isScrolled, setIsScrolled] = useState(false); // Scroll durumunu tutacak state
    const [showTopBar, setShowTopBar] = useState(true); // Üst barın görünürlüğü
    const category = useSelector((state) => state.categories.allCategories);
    const campaigns = [
        {id: 1, slogan: "Online Satışa Özel %10 İndirim!"},
        {id: 2, slogan: "Tüm Alışverişlerde Kargo Bedava!"},
        {id: 3, slogan: "Yeni Sezona Merhaba: %15 İndirim Fırsatı!"},
        {id: 4, slogan: "3 Al 2 Öde Kampanyası!"},
        {id: 5, slogan: "Bugüne Özel %20'ye Varan İndirimler!"},
        {id: 6, slogan: "Özel Ürünlerde %30'a Varan İndirimler!"},
        {id: 7, slogan: "Arkadaşını Davet Et, %5 Ekstra İndirim Kazan!"},
        {id: 8, slogan: "Sezon Sonu İndirimi: %50'ye Varan Fırsatlar!"},
        {id: 9, slogan: "Online Alışverişlerde İlk Siparişe Özel %10 İndirim!"},
        {id: 10, slogan: "Sadece Bu Hafta: 2. Üründe %50 İndirim!"},
    ];
    const menuFooter = [
        {id: 1, slogan: "Aramıza katıl"},
        {id: 2, slogan: "Sıkça sorulan sorular"},
        {id: 3, slogan: "Nasıl iade edilir?"},
        {id: 4, slogan: "Hediye Kartı"},
        {id: 5, slogan: "Mağazalar"},

    ]
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

    const menuItems = [
        {id: 1, name: "GDG Core", image: MenuImage},
        {id: 2, name: "The GDG Edit", image: MenuImage2},
        {id: 3, name: "GDG Exclusive", image: MenuImage3},
        {id: 4, name: "Fits"},
        {id: 5, name: "GDG Daily"},
        {id: 6, name: "GDG Vibes"},
        {id: 7, name: "GDG Studio"},
        {id: 8, name: "Essentials"},
        {id: 9, name: "Basics"},
        {id: 10, name: "Trending"},
    ];

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
            sx={{width: 600}}
            style={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                flexDirection: "column",
                padding: "20px",
            }}
        >
            <h5
                style={{
                    fontWeight: "bold",
                    color: "#376642",
                    fontFamily: "'Platypi', 'serif'",
                }}
            >
                Senin için önerilenler
            </h5>
            <div
                style={{
                    borderBottom: "2px solid black",
                    width: "90%",
                    marginTop: "10px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >

            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
            }}>

                {
                    category && category.map((item, index) => (

                        <div key={item.id} onClick={() => navigate(`/category/${item.id}`)} style={{
                            display: index < 6 ? "flex" : "none",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            backgroundColor: "#F0F0F0",
                            padding: "9px 15px",
                            fontSize: "13px",
                            borderRadius: "6px",
                            fontFamily: "'Platypi', 'serif'",
                            fontWeight: "light",
                            marginBottom: "20px",
                            cursor: "pointer",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        }}>

                            {item.name}
                        </div>
                    ))
                }
            </div>
            <div style={{
                display: "flex",
            }}>

                <div>

                    {category &&
                        category.map((item) => (
                            <div
                                onClick={() => navigate(`/category/${item.id}`)}
                                key={item.id}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontFamily: "'Platypi', 'serif'",
                                    letterSpacing: "-0.5px",
                                    padding: "10px",
                                    fontWeight: "lighter",
                                    color: item.id === 8 ? "#376642" : "#000",

                                }}
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
                <div style={{
                    marginLeft: "30px"
                }}>

                    {menuItems &&
                        menuItems.map((item, index) => (

                            <div
                                onClick={() => navigate(`/category/${item.id}`)}
                                key={item.id}
                                style={{
                                    display: index < 3 ? "flex" : "none",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontFamily: "'Platypi', 'serif'",
                                    letterSpacing: "-0.5px",
                                    padding: "10px",
                                    fontWeight: "lighter",
                                    color: "#000",
                                    alignItems: "center",
                                    textTransform: "uppercase"
                                }}
                            >
                                <img style={{
                                    marginRight: "5px",
                                    border: "none",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                }} src={item.image} alt=""/>
                                {item.name}
                            </div>

                        ))}

                </div>
                <div style={{
                    marginLeft: "30px"
                }}>

                    {campaigns &&
                        campaigns.map((item, index) => (

                            <div
                                onClick={() => navigate(`/category/${item.id}`)}
                                key={item.id}
                                style={{
                                    display: index < 6 ? "flex" : "none",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontFamily: "'Platypi', 'serif'",
                                    letterSpacing: "-0.5px",
                                    padding: "10px",
                                    fontWeight: "lighter",
                                    color: index === 4 ? "red" : "#000",
                                    alignItems: "center",
                                }}
                            >

                                {item.slogan}
                            </div>

                        ))}

                </div>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop:"50px",
                gap:"20px",
            }}>
                {
                    menuFooter && menuFooter.map((item, index) => (
                        <div key={index} style={{
                            display: "flex",
                            alignItems:'center',
                            justifyContent: "center",
                            fontSize: "13px",
                            color:"#c2c2c2",
                            fontFamily: "'Platypi', 'serif'",
                            fontWeight:"lighter",
                        }}>
                            {item.slogan}
                        </div>
                    ))
                }
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                alignItems:"center",
                justifyContent:"center",
                marginTop:"20px",
                backgroundColor: "rgba(0, 0, 0)",
            }}>
                <img style={{

                    width:"110px",
                }} src={MenuFooterImage} alt=""/>
            </div>
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
                        <h6 style={{margin: 0}}>Erkek</h6>
                    </UnderlinedText>
                    <UnderlinedText>
                        <h6 style={{margin: 0}}>Kadın</h6>
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
                        <BsBag/>
                    </div>
                    <div
                        style={{
                            fontSize: "25px",
                            color: isScrolled ? "#fff" : "#000",
                            transition: "color 0.3s ease",
                        }}
                    >
                        <RiAccountBoxLine/>
                    </div>
                </div>
            </div>

            {/* Sayfa İçeriği: Header'ın altından başlamak için padding-top */}
            <div style={{paddingTop: showTopBar ? "120px" : "70px"}}>
                {/* Buraya sayfanın geri kalan içeriğini yerleştirebilirsiniz */}
                {/* Örneğin, ürün listeleme, kategori gösterimi vs. */}
            </div>
        </div>
    );
}

export default Header;
