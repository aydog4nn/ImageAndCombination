import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../redux/slices/UserSlice.jsx";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error, isLoggedIn } = useSelector((state) => state.users);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postUser(formData));
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <div
                style={{
                    width: "400px",
                    padding: "40px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    textAlign: "center",
                }}
            >
                <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Tekrar hoş geldin</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-posta adresi*"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Şifre"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#10A37F",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        Devam et
                    </button>
                </form>
                <p style={{ margin: "16px 0", fontSize: "14px" }}>
                    Hesabın yok mu?{" "}
                    <a
                        href="/register"
                        style={{
                            color: "#10A37F",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Kaydol
                    </a>
                </p>
                <div
                    style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#ddd",
                        margin: "16px 0",
                    }}
                ></div>
                <div>
                    <button
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "8px",
                            backgroundColor: "#fff",
                            color: "#000",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Google ile devam et
                    </button>
                    <button
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "8px",
                            backgroundColor: "#fff",
                            color: "#000",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Microsoft Hesabı ile devam et
                    </button>
                    <button
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "#fff",
                            color: "#000",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Apple ile devam et
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
