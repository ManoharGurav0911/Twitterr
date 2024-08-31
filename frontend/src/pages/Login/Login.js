// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";
// import TwitterIcon from '@mui/icons-material/Twitter';
// import twitterimg from "../../image/twitter.jpeg";
// import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
// import auth from "../../context/firebase"; // Ensure this path is correct
// import "./Login.css";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const { signInWithEmailAndPassword, user, loading } = useUserAuth();
//     const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user || googleUser) {
//             console.log(user || googleUser);
//             navigate("/");
//         }
//     }, [user, googleUser, navigate]);

//     useEffect(() => {
//         if (error) {
//             console.log(error);
//         }
//     }, [error]);

//     useEffect(() => {
//         if (loading || googleLoading) {
//             console.log('loading....');
//         }
//     }, [loading, googleLoading]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         try {
//             await signInWithEmailAndPassword(email, password);
//         } catch (err) {
//             setError(err.message);
//             window.alert(err.message);
//         }
//     };

//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             await signInWithGoogle();
//         } catch (error) {
//             setError(error.message);
//             window.alert(error.message);
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="image-container">
//                 <img className="image" src={twitterimg} alt="twitterImage" />
//             </div>
//             <div className="form-container">
//                 <div className="form-box">
//                     <TwitterIcon style={{ color: "skyblue" }} />
//                     <h2 className="heading">Happening now</h2>
//                     {error && <p>{error}</p>}
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="email"
//                             className="email"
//                             placeholder="Email address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <input
//                             type="password"
//                             className="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <div className="btn-login">
//                             <button type="submit" className="btn">Log In</button>
//                         </div>
//                     </form>
//                     <hr />
//                     <div>
//                         <GoogleButton
//                             className="g-btn"
//                             type="light"
//                             onClick={handleGoogleSignIn}
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     Don't have an account?
//                     <Link
//                         to="/signup"
//                         style={{
//                             textDecoration: 'none',
//                             color: 'var(--twitter-color)',
//                             fontWeight: '600',
//                             marginLeft: '5px'
//                         }}
//                     >
//                         Sign up
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";
// import TwitterIcon from '@mui/icons-material/Twitter';
// import twitterimg from "../../image/twitter.jpeg";
// import "./Login.css";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const { logIn, googleSignIn, user } = useUserAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             console.log(user);
//             navigate("/");
//         }
//     }, [user, navigate]);

//     useEffect(() => {
//         if (error) {
//             console.log(error);
//         }
//     }, [error]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         try {
//             await logIn(email, password);
//         } catch (err) {
//             setError(err.message);
//             window.alert(err.message);
//         }
//     };

//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             await googleSignIn();
//         } catch (error) {
//             setError(error.message);
//             window.alert(error.message);
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="image-container">
//                 <img className="image" src={twitterimg} alt="twitterImage" />
//             </div>
//             <div className="form-container">
//                 <div className="form-box">
//                     <TwitterIcon style={{ color: "skyblue" }} />
//                     <h2 className="heading">Happening now</h2>
//                     {error && <p>{error}</p>}
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="email"
//                             className="email"
//                             placeholder="Email address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <input
//                             type="password"
//                             className="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <div className="btn-login">
//                             <button type="submit" className="btn">Log In</button>
//                         </div>
//                     </form>
//                     <hr />
//                     <div>
//                         <GoogleButton
//                             className="g-btn"
//                             type="light"
//                             onClick={handleGoogleSignIn}
//                         />
//                     </div>
//                 </div>
//                 <div>
//                     Don't have an account?
//                     <Link
//                         to="/signup"
//                         style={{
//                             textDecoration: 'none',
//                             color: 'var(--twitter-color)',
//                             fontWeight: '600',
//                             marginLeft: '5px'
//                         }}
//                     >
//                         Sign up
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import TwitterIcon from '@mui/icons-material/Twitter';
import twitterimg from "../../image/twitter.jpeg";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from "../../context/firebase"; // Ensure this path is correct
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn, user } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log(user);
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                setError("The popup was closed before completing the sign-in. Please try again.");
            } else {
                setError(error.message);
            }
            window.alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="image-container">
                <img className="image" src={twitterimg} alt="twitterImage" />
            </div>
            <div className="form-container">
                <div className="form-box">
                    <TwitterIcon style={{ color: "skyblue" }} />
                    <h2 className="heading">Happening now</h2>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="btn-login">
                            <button type="submit" className="btn">Log In</button>
                        </div>
                    </form>
                    <hr />
                    <div>
                        <GoogleButton
                            className="g-btn"
                            type="light"
                            onClick={handleGoogleSignIn}
                        />
                    </div>
                </div>
                <div>
                    Don't have an account?
                    <Link
                        to="/signup"
                        style={{
                            textDecoration: 'none',
                            color: 'var(--twitter-color)',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}
                    >
                        Sign up.
                    </Link>
                </div>
                {/* Add the "Forgot Password?" link here */}
                <div>
                    <Link 
                        to="/forgot-password" 
                        style={{ textDecoration: 'none', color: 'var(--twitter-color)', fontWeight: '600' }}
                    >
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

