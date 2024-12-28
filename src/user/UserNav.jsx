import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import netflixLogo from "../images/Netflix-logo.png";
import maleAvatar from "../images/male.jpg";
import femaleAvatar from "../images/female.jpeg";
import defaultAvatar from "../images/default.jpeg";
import { useCart } from "../context/CartContext";


const UserNav = ({ favoriteCount, onSearchChange }) => {
    const [userDetails, setUserDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { favtItems } = useCart()

    // Fetch user profile details
    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem("userid");
            if (!userId) {
                navigate("/login");
                return;
            }

            try {
                const url = "http://localhost:1234/userapi/";
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch profile");

                const data = await response.json();
                const user = data.find((user) => user.id === userId);
                if (user) {
                    setUserDetails(user);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    // Get avatar image based on user details
    const getAvatar = () => {
        if (userDetails.profileImage) {
            return userDetails.profileImage;
        } else if (userDetails.gender === "Male") {
            return maleAvatar;
        } else if (userDetails.gender === "Female") {
            return femaleAvatar;
        }
        return defaultAvatar;
    };

    // Handle logout action
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Navigate to profile page
    const handleProfileClick = () => {
        navigate("/cart");
    };

    // Handle search input change
    const handleSearchInput = (e) => {
        const term = e.target.value;
        setSearch(term);
        onSearchChange(term); // Pass search term to parent
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid d-flex align-items-center">
                    {/* Netflix Logo */}
                    <img
                        src={netflixLogo}
                        alt="Netflix Logo"
                        style={{ width: "100px" }}
                        className="navbar-brand"
                    />


                    {/* Home and Popular Links */}
                    <ul className="navbar-nav d-flex flex-row ms-auto me-5">
                        <li className="nav-item me-4">
                            <a href="/userhome" className="nav-link text-light">
                                Home
                            </a>
                        </li>
                        <li className="nav-item me-4">
                            <a href="/popular" className="nav-link text-light">
                                Popular
                            </a>
                        </li>
                    </ul>

                    {/* Search and Profile Avatar */}
                    <div className="d-flex align-items-center">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            className="form-control me-4"
                            style={{ maxWidth: "250px" }}
                            onChange={handleSearchInput}
                        />

                        {/* Favorites and Avatar */}
                        <div className="d-flex align-items-center">
                            <Link to='/cart'>
                                <button
                                    className="btn bg-transparent me-4 text-danger"
                                    onClick={handleProfileClick}
                                    style={{ fontSize: "18px" }}
                                >
                                    <i className="fa fa-heart me-4"></i>
                                    {favoriteCount}{favtItems.length}
                                </button>
                            </Link>
                            <img
                                src={getAvatar()}
                                alt="Profile Avatar"
                                className="rounded-circle"
                                style={{ width: "50px", cursor: "pointer" }}
                                onClick={() => setShowModal(true)}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Profile Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Account Details</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {userDetails.fname ? (
                                    <>
                                        <p>
                                            <strong>Name:</strong> {userDetails.fname}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {userDetails.email}
                                        </p>
                                        <p>
                                            <strong>Plan:</strong> Premium
                                        </p>
                                        <p>
                                            <strong>Quality:</strong> Ultra HD
                                        </p>
                                    </>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/edit-profile")}
                                >
                                    Edit Profile
                                </button>
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserNav;
