import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Netflix-logo.png'; // Make sure to adjust the path

const Navbar = () => {
    const [language, setLanguage] = useState('English');

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <>
            <style>
                {`
                    body {
                        font-family: 'sans-serif', Arial, Helvetica, sans-serif;
                    }

                    /* For the dropdown when focused */
                    select.form-select:focus {
                        background-color: transparent !important; /* Transparent background when focused */
                        color: white !important; /* White text when focused */
                    }

                    /* Default state - Transparent background and white text */
                    select.form-select {
                        background-color: transparent !important;
                        color: white !important;
                    }

                    /* Dropdown options styling */
                    select.form-select option {
                        background-color: transparent !important;
                        color: white !important;
                    }

                    /* When the dropdown is open, change the background of options */
                    select.form-select:focus option {
                        background-color: white !important; /* White background for options */
                        color: black !important; /* Black text for options */
                    }
                `}
            </style>

            <div
                className="navbar navbar-expand-lg position-fixed w-100 top-0 start-0"
                style={{
                    backgroundColor: 'transparent',
                    padding: '10px 150px', // Increased padding to move content more inward
                    zIndex: 100,
                    marginTop: '20px',
                }}
            >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo on the left, moved further inward */}
                    <div className="logo" style={{ flex: '0 0 50%' }}>
                        <Link to="/">
                            <img src={logo} alt="Netflix Logo" style={{ width: '180px' }} /> {/* Increased size of the logo */}
                        </Link>
                    </div>

                    {/* Language Dropdown and Sign-in Button moved further inward */}
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            marginLeft: 'auto',
                            paddingRight: '10px',
                        }}
                    >
                        {/* Language Dropdown */}
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="form-select text-white bg-transparent border-white"
                            style={{
                                marginRight: '20px',
                                fontSize: '1rem',
                                height: '35px',
                                width: '120px',
                                textAlign: 'center', // Center text inside the dropdown
                                color: 'white', // Text color white when not focused
                            }}
                        >
                            <option value="English">English</option>
                            <option value="Kannada">Kannada</option>
                            <option value="Telugu">Telugu</option>
                        </select>

                        {/* Sign-in Button with Red Background */}
                        <Link to="/login">
                            <button
                                className="btn fw-bold"
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderColor: 'white',
                                    padding: '8px 10px',
                                    fontSize: '0.8rem',
                                    width: '80px',
                                    height: '35px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
