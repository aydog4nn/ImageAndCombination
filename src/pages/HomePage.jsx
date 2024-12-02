import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryById,} from "../redux/slices/CategoriesSlice.jsx";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import images from "../images/indeksModel-Photoroom.png"
import images2 from "../images/1fd5e68d-0d64-4723-9b53-38894758cad3-Photoroom.png"
import categoryImages1 from "../images/output (1).jpg"
import categoryImages2 from "../images/output (2).jpg"
import categoryImages3 from "../images/output (4).jpg"
import categoryImages4 from "../images/output (5).jpg"
import {FaArrowRight} from "react-icons/fa";
import {AiOutlineArrowRight} from "react-icons/ai";


function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category = useSelector((state) => state.categories.category);
    const buttonTexts = ["Ceket", "Mont ve Kaban", "Jean", "Sweatshirt"]; // Her buton için farklı yazılar


    const handleScrollDown = () => {
        if (targetDivRef.current) {

            window.scrollTo({
                top: targetDivRef.current.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    


    useEffect(() => {
        const fetchCategory = async () => {
            if (category.id) {
                await dispatch(fetchCategoryById(category.id));
            }
        };

        fetchCategory();
    }, [dispatch, category.id]);

    const targetDivRef = useRef(null);
    const imageRef = useRef(null);

    return (

        <div style={{width: "100%"}}>
            <div style={{
                backgroundColor: "#f7e7d4", padding: "0px", margin: "0px",
                display: "flex", justifyContent: "center", alignItems: "center",
                height: `${imageRef.current ? imageRef.current.height : "auto"}`
            }}>

                <img
                    ref={imageRef}
                    style={{
                        display: "block",
                        maxWidth: "100%",
                        height: "auto",
                        margin: 0,
                        paddingTop: "40px",
                        paddingLeft: "40px",
                    }}
                    src={images} alt="model"
                />

                <div style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    width: "30%",
                    height: "100%",
                    textAlign: "center"
                }}>
                    <h1 style={{
                        fontSize: "40px",
                        textWrap: "wrap",
                        textTransform: "uppercase",
                        fontFamily: "'Platypi', 'serif'"
                    }}>
                        Yapay Zeka ile Tarzını Keşfet ve Kendi Modanı Yarat!
                    </h1>
                    <hr/>
                    <p className="text-secondary">
                        Yapay zeka teknolojisi sayesinde stilinizi analiz ediyor, yüz hatlarınıza ve kişisel
                        tercihlerinize uygun kıyafet kombinleri öneriyoruz.
                        Tarzınıza en uygun renkleri ve aksesuarları belirleyerek şıklığınızı bir üst seviyeye taşımanız
                        için size rehberlik ediyoruz.
                        Kendi stilinizi keşfedin ve giyiminize yeni bir soluk kazandırın!
                    </p>
                    <div
                        onClick={() => navigate("/combinate")}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto",
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            color: "white",
                            cursor: "pointer",
                            transition: "transform 0.3s ease, background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                            e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <AiOutlineArrowRight size={30}/>
                    </div>


                </div>
            </div>

            <div style={{
                position: "relative",
                height: "100%",
            }}>
                <button
                    onClick={handleScrollDown}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "30px",
                        transition: "transform 0.3s ease, color 0.3s ease",
                        border: "1px solid black",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "black",
                        opacity: "0.6",
                    }}
                >
        <span
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
            }}
        >
            &#8595; {/* Aşağı ok simgesi */}
        </span>
                </button>
            </div>

            <div ref={targetDivRef} style={{
                height: "auto", backgroundColor: "#376642", transition: "opacity 1s ease-in-out",

            }}>
                <div className="d-flex justify-content-around align-items-center text-center ">


                    <img
                        ref={imageRef}
                        style={{

                            display: "block",
                            maxWidth: "100%",
                            height: "auto",
                            margin: 0,
                            paddingTop: "40px",
                            paddingLeft: "40px",

                        }}
                        src={images2} alt="model"
                    />

                </div>

            </div>
            <div className="bg-light" style={{
                height: "300px",
                textAlign: "center",
                fontFamily: "'Platypi', 'serif'",
            }}>
                <h4 className="mt-5" style={{
                    color: "#376642",

                }}>Daha fazla ürün eklendi</h4>
                <h1 className="text-uppercase">Kampanyalar %40&#39;a varan indirim indirim!</h1>
                <button className="text-uppercase p-2 border-0 bg-dark text-white rounded-1">alışverişe başla</button>
                <h5 className="mt-4 font-playtpi">SECILI URUNLERDE</h5>
                <h6 className="text-secondary">Mağazalarda ve online satışta</h6>
                <p className="mt-5">Diğer kampanyalarla birleştirilemez.1 Ağustos - 05 Kasım arası geçerli.</p>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    width: "100%",
                    justifyItems: "center",
                    alignItems: "center",
                }}
            >
                {[categoryImages1, categoryImages2, categoryImages3, categoryImages4].map(
                    (image, index) => (
                        <div
                            key={index}
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                            }}
                        >
                            {/* Resim */}
                            <img
                                src={image}
                                alt=""
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    display: "block",
                                }}
                            />

                            {/* Siyah Transparan Katman */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparan siyah
                                }}
                            ></div>

                            {/* Ortadaki Transparan Buton */}
                            <button
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)", // Tam merkeze hizalar
                                    padding: "5px 40px",
                                    backgroundColor: "transparent", // Transparan arka plan
                                    color: "#fff", // Beyaz yazı
                                    border: "1px solid #fff", // Beyaz çerçeve
                                    borderRadius: "50px",
                                    cursor: "pointer",
                                    zIndex: 2, // Katmanın üstünde görünmesi için
                                    fontSize: "16px", // Yazı boyutu
                                    textTransform: "uppercase",
                                    textWrap: "nowrap",
                                    fontFamily: "'Platypi', 'serif'",
                                }}
                                onClick={() =>
                                    console.log(`Butona tıklanan yazı: ${buttonTexts[index]}`)
                                }
                            >
                                {buttonTexts[index]} {/* Farklı buton yazıları */}
                            </button>
                        </div>

                    )
                )}
            </div>
            <h1 style={{
                fontFamily: "'Platypi', 'serif'",
                letterSpacing: "10px",
            }} className="text-start p-5 tr"><FaArrowRight className="mb-3"/> İLGİNİZİ ÇEKEBİLİR </h1>

            ;


        </div>);
}

export default HomePage;
