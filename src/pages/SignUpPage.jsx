import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../redux/slices/UserSlice.jsx";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../images/output (28).jpg'
import CarouselImage2 from '../images/output (29).jpg'
import CarouselImage3 from '../images/output (27).jpg'
import {Image} from "react-bootstrap";

function SignUpPage() {
    const [formData, setFormData] = useState({
        fullName: "", email: "", password: "",
    });
    const [tPassword, setTPassword] = useState("");

    const dispatch = useDispatch();
    const {loading, error,user} = useSelector((state) => state.users);

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




    return (<div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "50px",
            backgroundColor: "#fff",
            fontFamily: "'Platypi', 'serif'"
        }}
    >
        <div
            style={{
                display: "flex",
                width: "900px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                height: "550px",

            }}
        >
            {/* Sol Panel */}
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
                }}
            >
                <Carousel controls={false} indicators={true} interval={4000} pause={false}>
                    <Carousel.Item>
                        <Image style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                        }} src={CarouselImage}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image style={{
                            borderRadius: "12px",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                        }}  src={CarouselImage2}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image style={{
                            borderRadius: "12px",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                        }}  src={CarouselImage3}/>
                    </Carousel.Item>
                </Carousel>


            </div>

            {/* Sağ Panel */}
            <div
                style={{
                    width: "50%",
                    backgroundColor: "#376642",
                    padding: "40px",
                    color: "#000    ",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <h2 style={{fontSize: "32px", fontWeight: "bold", marginBottom: "20px" , color:"#000"}}>
                    Hesap oluştur
                </h2>
                <p style={{marginBottom: "20px",color:"#fff"}}>
                    Zaten kayıtlı mısın?{" "}
                    <a href="/login" style={{color: "#F7E7D4", textDecoration: "underline"}}>
                        Giriş yap
                    </a>
                </p>
                <form onSubmit={handleSubmit}>
                    <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
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
                    <div style={{position: "relative", marginBottom: "20px"}}>
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
                    <div style={{position: "relative", marginBottom: "20px"}}>
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
                    <div style={{marginBottom: "20px"}}>
                        <label style={{display: "flex", alignItems: "center",color:"white"}}>
                            <input
                                type="checkbox"
                                style={{marginRight: "10px"}}
                                required
                            />
                            Şartları ve koşulları{" "}
                            <a
                                href="/terms"
                                style={{color: "#F7E7D4", textDecoration: "underline", marginLeft: "5px"}}
                            >
                                kabul ediyorum.
                            </a>
                        </label>
                    </div>
                    <button
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
    </div>);
}

export default SignUpPage;
