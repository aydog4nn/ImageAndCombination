import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, fetchCategoryById,} from "../redux/slices/CategoriesSlice.jsx";
import {addProducts} from "../redux/slices/ProductSlice.jsx";
import {useRef} from "react";
import images from "../images/indeksModel-Photoroom.png"
import images2 from "../images/1fd5e68d-0d64-4723-9b53-38894758cad3-Photoroom.png"
import {Paper} from "@mui/material";
import Box from "@mui/material/Box";


function HomePage() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [productData, setProductData] = useState({
        size: "", name: "", material: "", brand: "", price: 0, categoryId: 1
    });

    const category = useSelector((state) => state.categories.category);
    const allCategory = useSelector((state) => state.categories.allCategories);
    const allProducts = useSelector(state => state.products.allProducts)

    // Burası kategori işlemleri için yapılan fonksiyon
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (name && description) {
            console.log("Gönderilen Kategori:", {name, description});
            dispatch(addCategory({name, description}));
            setName("");
            setDescription("");
        } else {
            alert("İsim ve açıklama gerekli!");
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        console.log("Gönderilen Ürün:", productData);
        setProductData({size: "", name: "", material: "", brand: "", price: 0});
        dispatch(addProducts(productData))
    };

    const handleProductChange = (e) => {
        const {name, value} = e.target;
        setProductData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };


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
                </div>
            </div>

            {/* Aşağı ok butonu */}
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
                        opacity: "0.6",  // Bu opaklık sadece butonun arka planına etkiler
                    }}
                >
        <span
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Ok simgesini tam ortalayacak
                color: "white", // Ok simgesinin rengini beyaz yapalım
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
            <div style={{
                height: "100px",
            }}></div>
        </div>);
}

export default HomePage;
