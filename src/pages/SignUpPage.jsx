import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/UserSlice.jsx";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../images/output (28).jpg';
import CarouselImage2 from '../images/output (29).jpg';
import CarouselImage3 from '../images/output (27).jpg';
import { Image } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: "", email: "", password: "",
    });
    const navigate = useNavigate();
    const [tPassword, setTPassword] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // For responsive behavior

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.users);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(registerUser(formData));
    };

    // Update windowWidth on resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Responsive styles based on window width
    const isMobile = windowWidth <= 768;
    const isTablet = windowWidth <= 1024;

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "50px",
                backgroundColor: "#fff",
                fontFamily: "'Platypi', 'serif'",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    width: "100%",
                    maxWidth: "900px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                    height: "auto",
                    flexWrap: "wrap", // Allow wrapping for mobile
                }}
            >
                {!isMobile && (
                    <div
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: "#376642",
                            color: "#000",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            width: "50%",
                            padding: "20px",
                        }}
                    >
                        <Carousel controls={false} indicators={true} interval={4000} pause={false}>
                            <Carousel.Item>
                                <Image
                                    style={{
                                        width: "100%",
                                        borderRadius: "12px",
                                        objectFit: "cover",
                                    }}
                                    src={CarouselImage} />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                    style={{
                                        width: "100%",
                                        borderRadius: "12px",
                                        objectFit: "cover",
                                    }}
                                    src={CarouselImage2} />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                    style={{
                                        width: "100%",
                                        borderRadius: "12px",
                                        objectFit: "cover",
                                    }}
                                    src={CarouselImage3} />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                )}

                {/* Sağ Panel (Kayıt Formu kısmı her zaman görünür) */}
                <div
                    style={{
                        width: isMobile ? "100%" : "50%", // 100% width for mobile
                        backgroundColor: "#376642",
                        padding: "40px",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <h2 style={{
                        fontSize: isMobile ? "24px" : "32px", // Smaller font size on mobile
                        fontWeight: "bold",
                        marginBottom: "20px",
                        color: "#fff",
                    }}>
                        Hesap oluştur
                    </h2>
                    <p style={{
                        marginBottom: "20px",
                        color: "#fff"
                    }}>
                        Zaten kayıtlı mısın?{" "}
                        <a href="/login" style={{
                            color: "#F7E7D4",
                            textDecoration: "underline"
                        }}>
                            Giriş yap
                        </a>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px"
                        }}>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="isim"
                                value={formData.fullName}
                                onChange={handleChange}
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    borderRadius: "4px",
                                    border: "1px solid #CCC",
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    width: "100%", // Full width on small screens
                                }}
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #CCC",
                                marginBottom: "20px",
                                backgroundColor: "#fff",
                                color: "#000",
                            }}
                        />
                        <div style={{ position: "relative", marginBottom: "20px" }}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Sifre"
                                value={formData.password}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    border: "1px solid #CCC",
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                            />
                        </div>
                        <div style={{ position: "relative", marginBottom: "20px" }}>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Sifreni Dogrula"
                                value={tPassword}
                                onChange={(e) => setTPassword(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    border: "1px solid #CCC",
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "flex",
                                alignItems: "center",
                                color: "white"
                            }}>
                                <input
                                    type="checkbox"
                                    style={{ marginRight: "10px" }}
                                    required
                                />
                                Şartları ve koşulları{" "}
                                <a
                                    href="/terms"
                                    style={{
                                        color: "#F7E7D4",
                                        textDecoration: "underline",
                                        marginLeft: "5px"
                                    }}
                                >
                                    kabul ediyorum.
                                </a>
                            </label>
                        </div>
                        <button
                            onClick={() => navigate("/login")}
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "10px",
                                backgroundColor: "#000",
                                color: "#FFF",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Hesap oluştur
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
