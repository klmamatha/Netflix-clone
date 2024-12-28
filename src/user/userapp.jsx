// UserModule.js
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Myprofile from './profile';
import logo from '../images/Netflix-logo.png'; // Adjust path if needed
import defaultMaleImage from '../images/male.jpg';
import defaultFemaleImage from '../images/female.jpeg';

const UserModule = () => {
    const [language, setLanguage] = useState('English');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage or API
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        if (userData.image) {
            setProfileImage(userData.image); // Use uploaded image if available
        } else {
            // Set default image based on gender
            if (userData.gender === 'male') {
                setProfileImage(defaultMaleImage);
            } else if (userData.gender === 'female') {
                setProfileImage(defaultFemaleImage);
            } else {
                setProfileImage(defaultMaleImage); // Default to male image if gender is unknown
            }
        }
    }, []);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = "#/login";
        window.location.reload();
    };

    return (
        <HashRouter>
            <style>
                {`
                    body {
                        font-family: 'sans-serif', Arial, Helvetica, sans-serif;
                    }

                    select.form-select:focus {
                        background-color: transparent !important;
                        color: white !important;
                    }

                    select.form-select {
                        background-color: transparent !important;
                        color: white !important;
                    }

                    select.form-select option {
                        background-color: transparent !important;
                        color: white !important;
                    }

                    select.form-select:focus option {
                        background-color: white !important;
                        color: black !important;
                    }
                `}
            </style>

            <nav
                className="navbar navbar-expand-lg position-fixed w-100 top-0 start-0"
                style={{
                    backgroundColor: 'transparent',
                    padding: '10px 150px',
                    zIndex: 100,
                    marginTop: '20px',
                }}
            >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="logo" style={{ flex: '0 0 50%' }}>
                        <Link to="/">
                            <img src={logo} alt="Netflix Logo" style={{ width: '180px' }} />
                        </Link>
                    </div>

                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ marginLeft: 'auto', paddingRight: '10px' }}
                    >
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="form-select text-white bg-transparent border-white"
                            style={{
                                marginRight: '20px',
                                fontSize: '1rem',
                                height: '35px',
                                width: '120px',
                                textAlign: 'center',
                                color: 'white',
                            }}
                        >
                            <option value="English">English</option>
                            <option value="Kannada">Kannada</option>
                            <option value="Telugu">Telugu</option>
                        </select>

                        <Link to="/profile">
                            <img
                                src={profileImage}
                                alt="User Profile"
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    marginRight: '15px',
                                }}
                            />
                        </Link>

                        <button
                            className="btn fw-bold"
                            onClick={logout}
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                borderColor: 'white',
                                padding: '8px 10px',
                                fontSize: '0.8rem',
                                width: '80px',
                                height: '35px',
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route exact path="/" element={<Myprofile />} />
                <Route exact path="/profile" element={<Myprofile />} />
            </Routes>
        </HashRouter>
    );
};

export default UserModule;
