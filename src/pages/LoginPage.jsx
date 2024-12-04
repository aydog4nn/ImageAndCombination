import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {postUser} from "../redux/slices/UserSlice.jsx";
import {useNavigate} from "react-router-dom";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,loading,error,isLoggedIn} = useSelector((state) => state.users)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        if (isLoggedIn){
            navigate("/home")
        }
    },[isLoggedIn,navigate])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postUser(formData));
    };

    useEffect(() => {
        if (isLoggedIn) {
            setFormData({
                email: "",
                password: "",
            });
        }
    }, [isLoggedIn]);

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Login</button>
                {loading && <p>Loading...</p>}  {/* Yükleniyor durumu */}
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Hata mesajı */}
            </form>
        </div>

    )
}

export default LoginPage