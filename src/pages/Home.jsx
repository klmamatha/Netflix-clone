import { useNavigate } from "react-router-dom";
import Navbar from './navbar';// Adjust the path
import backgroundImage from '../images/Netflix.webp';
import Footer from './footer';

const Home = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate("/signup");
    };
    return (
        <>
            <style>
                {`
                    body {
                        font-family: 'sans-serif', Arial, Helvetica, sans-serif;
                    }
                `}
            </style>
            <Navbar />
            <div
                className="position-relative d-flex justify-content-center align-items-center text-white"
                style={{
                    height: '100vh', // Full screen height
                    width: '100vw', // Full screen width
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Dark Overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
                        zIndex: 1, // Ensure the overlay appears over the background image
                    }}
                ></div>

                {/* Text Content */}
                <div
                    className="position-relative text-center d-flex flex-column align-items-center"
                    style={{
                        zIndex: 2,
                        maxWidth: '700px',
                        padding: '20px',
                        width: '50%', // Adjust to occupy half of the screen width
                    }}
                >
                    <h1
                        className="mb-3"
                        style={{
                            fontSize: '3rem',
                            textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9)',
                            fontWeight: '900',  // Higher font weight than fw-bolder
                        }}
                    >
                        Unlimited movies,
                    </h1>
                    <h1
                        className="mb-3"
                        style={{
                            fontSize: '3rem',
                            textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9)',
                            fontWeight: '900',  // Higher font weight than fw-bolder
                        }}
                    >
                        TV shows and more
                    </h1>
                    <h4
                        className="fw-bold mb-3"
                        style={{
                            fontSize: '1.5rem',
                            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
                        }}
                    >
                        Starts at ₹149. Cancel at any time.
                    </h4>
                    <h6
                        className="fw-bold mb-4"
                        style={{
                            fontSize: '1rem',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
                        }}
                    >
                        Ready to watch? Enter your email to create or restart your membership.
                    </h6>

                    {/* Input Field with Floating Label and Button Side by Side */}
                    <div className="d-flex w-100 justify-content-center">
                        <div className="form-floating w-75">
                            <input
                                type="email"
                                className="form-control bg-transparent text-white border-secondary"
                                id="email"
                                placeholder="Email Address"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // More transparent dark background
                                    color: 'white', // White text color
                                    fontSize: '1rem',
                                    minHeight: '50px', // Ensures proper height
                                    borderRadius: '5px', // Slightly rounded corners
                                    border: '1px solid rgba(255, 255, 255, 0.4)', // Subtle border
                                }}
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-danger btn-lg ms-2"
                            onClick={handleGetStarted}
                            style={{
                                whiteSpace: 'nowrap',
                                fontWeight: 'bold',
                                boxShadow: '0 0 5px rgba(255, 0, 0, 0.7)',
                            }}
                        >
                            Get Started &gt;
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
