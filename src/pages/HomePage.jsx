import React from 'react'
import {useState} from "react";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addCategory, fetchCategoryById} from "../redux/slices/CategoriesSlice.jsx";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";

function HomePage() {


    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const category = useSelector((state) => state.categories.category);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && description) {
            console.log("Gönderilen Kategori:", {name, description});
            dispatch(addCategory({name, description}));
            setName("");
            setDescription("");
        } else {
            alert("İsim ve açıklama gerekli!");
        }
    }

    useEffect(() => {
        const fetchCategory = async () => {
            if (category.id) { // category.id'nin tanımlı olup olmadığını kontrol et
                await dispatch(fetchCategoryById(category.id));
            }
        };

        fetchCategory(); // Asenkron fonksiyonu çağır
    }, [dispatch, category.id]); // Bağımlılıklar


    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text"
                                  placeholder="Kategori giriniz..." required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Açıklamayı giriniz</Form.Label>
                    <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea"
                                  rows={3} required/>
                </Form.Group>
                <Button variant="primary" type="submit">ekle</Button>
            </Form>

            <div>
                <h2>Kategoriler</h2>
                <ul>
                    {category && category.length > 0 ?
                        category.map((cat) => (
                            <li key={cat.id}>
                                <Link to={`/category/${cat.id}`}>{cat.name}</Link>
                            </li>
                        )) : (
                            <li> Hiç Kategori değeri bulunamadı!</li>
                        )
                    }
                </ul>
            </div>

        </div>
    );
}

export default HomePage