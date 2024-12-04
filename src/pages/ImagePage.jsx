import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadToProductPhoto } from "../redux/slices/ImageSlice.jsx";

function ImagePage({ id }) {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    console.log(id)
    const { loading, error, productData } = useSelector((state) => state.photo);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert("Lütfen bir dosya seçin!");
            return;
        }
        dispatch(uploadToProductPhoto({ photo: selectedFile, id }));
    };

    return (
        <Container>
            <h1>Fotoğraf Yükle</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Yükleniyor..." : "Yükle"}
            </button>
            {error && <p style={{ color: "red" }}>Hata: {error}</p>}
            {productData && <p style={{ color: "green" }}>Fotoğraf başarıyla yüklendi!</p>}
        </Container>
    );
}

export default ImagePage;
