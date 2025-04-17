import React, { useState, ChangeEvent, FormEvent } from "react";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormData } from "../../interfaces/sign-in-form/form-data";
import environment from "../../environments/environment";
import MessagesSuccess from "../../utils/messages-success";
import MessagesError from "../../utils/messages-error";
import './sign-in-form.css';

const SigninForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${environment.API_URL}/users/login`, formData);
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        const userData = await fetchUserData(response.data.token);
        navigate("/welcome", { replace: true });
      }
  } catch (err) {
    console.error('Error signing in:', err);
  }
  };

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get(`${environment.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the header
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };


  const isFormValid = (): boolean => {
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordErrors = validatePassword(password);
    return emailRegex.test(email) && passwordErrors.length === 0;
  };

  const validateField = (name: string, value: string) => {
    if (name === "password") {
      return validatePassword(value);
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
      }
    }
    return "";
  };

  const validatePassword = (value: string): string[] => {
    const errorMessages: string[] = [];
    if (value.length < 8) errorMessages.push("Minimum 8 characters.");
    if (!/[a-zA-Z]/.test(value)) errorMessages.push("At least one letter.");
    if (!/[0-9]/.test(value)) errorMessages.push("At least one number.");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) errorMessages.push("At least one special character.");
    return errorMessages;
  };

  return (
    <div className="signin-form-wrapper">
      <h2 className="signin-title">User Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
          </div>
          <div className="error-message-space">
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <i className="fas fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password?.length ? "input-error" : ""}
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              aria-label="Toggle password visibility"
            ></i>
          </div>
          <div className="error-message-space">
            {Array.isArray(errors.password) && errors.password.map((err, idx) => (
              <div key={idx} className="error">
                {err}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={!isFormValid()}>Sign In</button>

        {/* Link to navigate to the Sign-Up screen */}
        <div className="form-footer">
        <p className="signup-prompt">
          Don't have an account? <span className="signup-link" onClick={() => navigate("/signup", {replace: true})}>Sign Up</span>
        </p>
      </div>
      </form>
    </div>
  );
};

export default SigninForm;
