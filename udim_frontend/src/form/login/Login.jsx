import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineLockPerson } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLoginBtn } from '../Authentication/Oauth';
import { useAuth } from "../../apiAndContext";
import * as Yup from "yup";
import '../Form.css';
import authService from "../../backend/auth";

const LoginForm = () => {
  const { login, status } = useAuth();
  // const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || '/home';
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if(status) navigate('/home')
  }, [status, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const response = await authService.login(formData);
      if (response.status === 200) {
        const user = await authService.getCurrentUser();
        if (user) {
          login(user);
        }
      }
      setErrors({});
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data.msg);
        alert(error.response.data.msg);
      } else if (error.inner) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Request setup error:', error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
      });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
              {showPassword ? <FiEye onClick={togglePasswordVisibility} /> : <FiEyeOff onClick={togglePasswordVisibility} />}
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit">Login</button>
          <div className="third_party_sign">
            <div className="auth-icon-container">
              <GoogleLoginBtn />
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
