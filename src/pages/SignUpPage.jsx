import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../redux/slices/UserSlice.jsx";

function SignUpPage() {



    const [formData, setFormData] = useState({
        fullName:"",
        email:"",
        password: "",
    })
    const dispatch = useDispatch();
    const {loading,error,user} = useSelector((state) => state.users.user);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };
    return (
        <div
            className="d-flex align-items-center justify-content-center flex-column m-auto mt-5 border border-black w-50 p-5 "
            style={{
                height: "500px",
                gap: "10px",
            }}>
            <div className="signup-form w-75 m-auto">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group d-flex flex-column mb-4">
                        <label htmlFor="name">Name:</label>
                        <input
                            style={{
                                height: "40px"
                            }}
                            type="text"
                            name="fullName"
                            onChange={handleChange}
                            placeholder="İsminizi giriniz"
                            value={formData.fullName}
                        />
                    </div>

                    <div className="form-group d-flex flex-column">
                        <label htmlFor="email">Email:</label>
                        <input
                            style={{
                                height: "40px"
                            }}
                            className="mb-4 "
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="E-posta adresinizi giriniz.."
                            value={formData.email}
                        />
                    </div>

                    <div className="form-group d-flex flex-column">
                        <label htmlFor="password">Password:</label>
                        <input
                            style={{
                                height: "40px"
                            }}
                            className="mb-4"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Sifrenizi giriniz..."
                            value={formData.password}
                        />
                    </div>

                    <div className="form-group d-flex flex-column">
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input
                            style={{
                                height: "40px"
                            }}
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            placeholder="Sifrenizi tekrar giriniz..."
                        />
                    </div>

                    <button className="mt-3 d-flex p-2 border rounded-1 bg-black text-white cursor-pointer"
                            type="submit">Kayıt Ol
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
