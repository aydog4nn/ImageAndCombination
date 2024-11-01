import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
function Header() {

    const navigate = useNavigate();

    return (

        

        <div>

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand style={{
                        cursor: 'pointer',
                    }} onClick={() => navigate("/home")}>Navbar</Navbar.Brand>
                    <Nav className="">
                        <Nav.Link onClick={() => navigate("/register")}>Kayıt Ol</Nav.Link>
                        <Nav.Link onClick={() => navigate("/login")}>Giriş Yap</Nav.Link>
                        <Nav.Link onClick={() => navigate("/image")}>Resim yükle</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            
            
        </div>
    );
}

export default Header;
