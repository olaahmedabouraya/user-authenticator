import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FormData } from "../../interfaces/sign-up-form/form-data";
import environment from "../../environments/environment";
import MessagesSuccess from "../../utils/messages-success";
import MessagesError from "../../utils/messages-error";
import { useNavigate } from "react-router-dom";
import './sign-up-form.css';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    password: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${environment.API_URL}/users/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/welcome", {replace: true});

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const isFormValid = (): boolean => {
    const { name, email, password } = formData;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordErrors = validatePassword(password);
  
    return (
      name.trim().length >= 3 &&
      emailRegex.test(email) &&
      passwordErrors.length === 0
    );
  };

  const validateField = (name: string, value: string) => {
    if (name === "password") {
      return validatePassword(value);
    }

    if (name === "name") {
      if (value.trim().length < 3) {
        return "Name must be at least 3 characters long.";
      }
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
  
    if (value.length < 8) {
      errorMessages.push("Minimum 8 characters.");
    }
    if (!/[a-zA-Z]/.test(value)) {
      errorMessages.push("At least one letter.");
    }
    if (!/[0-9]/.test(value)) {
      errorMessages.push("At least one number.");
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
      errorMessages.push("At least one special character.");
    }
  
    return errorMessages;
  };

  return (
    <div className="signup-form-wrapper">
      <h2 className="signup-title">User Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className="input-wrapper">
            <i className="fas fa-user"></i>
            <input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}/>
          </div>
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

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
            {Array.isArray(errors.password) &&
              errors.password.map((err, idx) => (
                <div key={idx} className="error">
                  {err}
                </div>
              ))}
          </div>
        </div>

        <button type="submit" disabled={!isFormValid()}>
          Sign Up
        </button>
                {/* Link to navigate to the Sign-Up screen */}
                <div className="form-footer">
                <p className="signin-prompt">
                  Already have an account? <span className="signin-link" onClick={() => navigate("/", {replace: true})}>Sign In</span>
                </p>
              </div>
      </form>
    </div>
  );
};

export default SignupForm;
