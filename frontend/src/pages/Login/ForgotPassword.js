import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth  from "../../context/firebase"; // Ensure this path is correct based on your project structure
// import "./ForgotPassword.css"; // Ensure you have CSS for styling

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await auth.sendPasswordResetEmail(email);
            setMessage("Password reset email sent! Please check your inbox.");
        } catch (err) {
            setError("Failed to send reset email. Please check the email address and try again.");
            console.error(err); // Optional: Log the actual error for debugging
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Reset Password</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handlePasswordReset}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-email"
                />
                <button type="submit" className="btn">Send Reset Email</button>
            </form>
            <button className="btn-back" onClick={() => navigate('/login')}>Back to Login</button>
        </div>
    );
};

export default ForgotPassword;
