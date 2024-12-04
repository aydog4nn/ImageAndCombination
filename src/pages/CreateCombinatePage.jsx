import { Container, Form, Button } from 'react-bootstrap';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {uploadImage} from "../redux/slices/AdviceSlice.jsx";

function CreateCombinatePage() {

    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const { loading , error,imageURL} = useSelector((state) => state.advice);
    const userID = localStorage.getItem("userID");
    console.log(userID);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedImage) {
            dispatch(uploadImage({imageFile: selectedImage,id:userID}));
        }else{
            console.log("Lutfen bir fotograf seciniz!")
        }
    }

    return (
        <div><Container>
            <h1>Upload an Image</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose an image to upload:</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
            {imageURL && (
                <div>
                    <h3>Yuklenen Fotograf</h3>
                    <img src={imageURL} alt="Yuklenen fotograf"/>
                </div>
            )}
        </Container>
        </div>
    )
}
export default CreateCombinatePage;
