import React, { useEffect } from "react";
import { useState } from "react";
import "./Sign_Up.css"; // Optional CSS import

function Sign_Up() {
    const initialValues = {name: "", phone: "", email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    },[formErrors]);

    const validate = (values) => {
        
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPhone = /^((\+44)|(0)) ?\d{4} ?\d{6}$/i;
        if (!formValues.name){
            errors.name = "Name is required!"; 
        }
        if (!formValues.phone){
            errors.phone = "Phone Number is required!"; 
        }else if(!regexPhone.test(values.phone)){
            errors.phone = "This is not a valid phone format!";
        }else if(values.phone.length > 11){
            errors.phone = "Phone number can not excced 10 characters";
        }
        if (!formValues.email){
            errors.email = "Email is required!"; 
        }else if(!regex.test(values.email)){
            errors.email = "This is not a valid email format!";
        }
        if (!formValues.password){
            errors.password = "Password is required!"; 
        }
        return errors;
    }
  return (
    <div>
      {/* Main container with margin-top */}
      <div className="container" style={{ marginTop: "5%" }}>
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        {/* Grid layout for sign-up form */}
        <div className="signup-grid">
          {/* Title for the sign-up form */}
          <div className="signup-text">
            <h1>Sign Up</h1>
          </div>

          {/* Text for existing members to log in */}
          <div className="signup-text1" style={{ textAlign: "left" }}>
            Already a member?{" "}
            <span>
              <a href="../Login/Login.html" style={{ color: "#2190FF" }}>
                Login
              </a>
            </span>
          </div>

          {/* Form for user sign-up */}
          <div className="signup-form">
            <form>
              {/* Form group for user's name */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="form-control"
                  placeholder="Enter your name"
                  aria-describedby="helpId"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
                <p>{ formErrors.name}</p>
              {/* Form group for user's phone number */}
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="form-control"
                  placeholder="Enter your phone number"
                  aria-describedby="helpId"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
              <p>{ formErrors.phone}</p>
              {/* Form group for user's email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <p>{ formErrors.email}</p>
              {/* Form group for user's password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p>{ formErrors.password}</p>
              {/* Button group for form submission and reset */}
              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-danger mb-2 waves-effect waves-light"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign_Up;
