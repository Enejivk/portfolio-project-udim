import React from 'react'
import { useState } from "react";
import { PiIdentificationBadgeDuotone } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineLockPerson } from "react-icons/md";
import { MdOutlineLockReset } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { GoogleLoginBtn } from '../Authentication/Oauth'
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import '../Form.css';
import authService from '../../backend/auth';



const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await authService.createAccount({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      console.log("Response", response.data);
      console.log("Form data", formData);
      setErrors({});
      navigate('/login');

    } catch (error) {
      // Handle validation errors or Axios request errors
      if (error.response) {
        // Server responded with an error status (4xx or 5xx)
        console.error('Server error:', error.response.data.error._schema[0]);
        alert(error.response.data.error._schema[0])
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
          <h1>Get Started</h1>
          <div>
            <div className="input-container">
              <PiIdentificationBadgeDuotone />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </div>

          <div>
            <div className="input-container">
              <PiIdentificationBadgeDuotone />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>


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

          <div>
            <div className="input-container">
              <MdOutlineLockReset />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              {showConfirmPassword ? <FiEye onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} />
                : <FiEyeOff onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} />
              }
            </div>
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </div>
          <button type="submit">Sign Up</button>

          <div className="third_party_sign">

            <div className="auth-icon-container">
              < GoogleLoginBtn />
            </div>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
          </div>
        </form>
        <div className="text-content">
          <h1>Ready to experience the power of group giving and saving? Sign up for free today</h1>
        </div>
      </main>
    </>
  );
};

export default RegistrationForm;