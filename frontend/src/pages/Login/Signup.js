import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleButton from "react-google-button";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import "./Login.css";
import auth from "../../context/firebase";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp, googleSignIn, user, loading } = useUserAuth();
    const navigate = useNavigate();
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (user || googleUser) {
            console.log(user);
            console.log(googleUser);
            navigate("/");
        }
    }, [user, googleUser, navigate]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        if (loading || googleLoading) {
            console.log("loading...");
        }
    }, [loading, googleLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            const newUser = {
                username: username,
                name: name,
                email: email,
            };

            const response = await fetch('https://pacific-peak-30751.herokuapp.com/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();

            if (data.acknowledged) {
                console.log(data);
                navigate('/');
            } else {
                setError("Registration failed.");
                console.error("Registration failed:", data);
            }
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (error) {
            console.log(error.message);
            console.error(error);
        }
    };

    return (
        <div className="signup-container">
            <div className="image-container">
                <img className="image" src={twitterimg} alt="twitterImage" />
            </div>
            <div className="form-container">
                <div className="form-box">
                    <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />
                    <h2 className="heading">Happening now</h2>
                    <div className="d-flex align-items-sm-center">
                        <h3 className="heading1">Join Twitter today</h3>
                    </div>
                    {error && <p className="errorMessage">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            className="display-name"
                            type="text"
                            placeholder="@username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="display-name"
                            type="text"
                            placeholder="Enter Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="btn-login">
                            <button type="submit" className="btn">Sign Up</button>
                        </div>
                    </form>
                    <hr />
                    <div className="google-button">
                        <GoogleButton
                            className="g-btn"
                            type="light"
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                    <div>
                        Already have an account?
                        <Link
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
