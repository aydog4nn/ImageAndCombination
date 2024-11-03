import React from 'react'
import {Container, Form, Button} from 'react-bootstrap';
import axios from "axios";

function ImagePage() {

    const [selectedFile, setSelectedFile] = React.useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please upload a file');
            return
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post("http://localhost:8080/api/products/file/1", formData,
                {headers: {'Content-Type': 'multipart/form-data'}});
            console.log("Yükleme Başalarılı", response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    return (
        <div><Container>
            <h1>Upload an Image</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Yükle</button>
        </Container>
        </div>
    )
}

export default ImagePage