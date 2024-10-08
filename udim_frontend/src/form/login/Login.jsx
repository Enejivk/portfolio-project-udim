import { useState} from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineLockPerson } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLoginBtn } from '../Authentication/Oauth'
import axios from '../Authentication/axios'
import useAuth from "../Authentication/useAuth";

import * as Yup from "yup";
import '../Form.css';


const LoginForm = () => {
    const { auth, setAuth } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/home'

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false)

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Invalid email format"),
        password: Yup.string().required("Password is required")
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });

            const response = await axios.post('/auth/login',
                JSON.stringify(formData),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            const refresh_token = response.data?.refresh_token;
            const token = response.data?.access_token;
            setAuth({ token, refresh_token });
            navigate(from, {replace: true});
            setErrors({});


        } catch (error) {
            // Handle validation errors or Axios request errors
            if (error.response) {
                // Server responded with an error status (4xx or 5xx)
                console.error('Server error:', error.response.data.msg);
                alert(error.response.data.msg)

            } else if (error.request) {
                // Request made but no response received
                console.error('Request error:', error.request);

            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Request setup error:', error.message);
            }

            // Handle form validation errors if any
            const newErrors = {};
            if (error.inner) {
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            }
            setErrors(newErrors); // Update state with validation errors
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Validate each field as user types
        validationSchema
            .validateAt(name, { [name]: value })
            .then(() => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            })
            .catch((error) => {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: error.message,
                }));
            });
    };

    return (
        <> 
            <Link to='/'>
                <div className="form-close">
                    <IoMdClose fontSize={35} />
                </div>
            </Link>
            <main className="signUp-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>

                    <div>
                        <div className="input-container">
                            <AiOutlineMail />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div>
                        <div className="input-container">
                            <MdOutlineLockPerson />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                placeholder="Password"
                                onChange={handleChange}
                            />
                            {showPassword ? <FiEye onClick={() => { setShowPassword(!showPassword) }} />
                                : <FiEyeOff onClick={() => { setShowPassword(!showPassword) }} />
                            }

                        </div>
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    <button type="submit">Sign Up</button>

                    <div className="third_party_sign">
                        <div className="auth-icon-container">
                            < GoogleLoginBtn />
                        </div>
                        <p>You don't have an account? <Link to='/signUp'>Sign Up</Link></p>
                    </div>
                </form>
                <div className="text-content">
                    <h1>Ready to experience the power of group giving and saving? Sign up for free today</h1>
                </div>
            </main>
        </>
    );
};

export default LoginForm;