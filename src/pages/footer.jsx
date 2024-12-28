import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const [language, setLanguage] = useState("English");

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div
            className="text-white py-4"
            style={{
                backgroundColor: "#141414", // Netflix-like black background
                fontSize: "14px",
            }}
        >
            <div className="container">
                <p className="mb-4">
                    Questions? Call{" "}
                    <a href="tel:8500372436" className="text-decoration-none text-white">
                        8500372436
                    </a>
                </p>
                <div className="row m-4">
                    <div className="col-md-3 mb-3">
                        <ul className="list-unstyled" style={{ lineHeight: "2.5" }}>
                            <li>
                                <Link to="/faq" className="text-decoration-none text-white">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/investor-relations" className="text-decoration-none text-white">
                                    Investor Relations
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-decoration-none text-white">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link to="/speed-test" className="text-decoration-none text-white">
                                    Speed Test
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3">
                        <ul className="list-unstyled" style={{ lineHeight: "2.5" }}>
                            <li>
                                <Link to="/help-centre" className="text-decoration-none text-white">
                                    Help Centre
                                </Link>
                            </li>
                            <li>
                                <Link to="/jobs" className="text-decoration-none text-white">
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookie-preferences" className="text-decoration-none text-white">
                                    Cookie Preferences
                                </Link>
                            </li>
                            <li>
                                <Link to="/legal-notices" className="text-decoration-none text-white">
                                    Legal Notices
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3">
                        <ul className="list-unstyled" style={{ lineHeight: "2.5" }}>
                            <li>
                                <Link to="/account" className="text-decoration-none text-white">
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/ways-to-watch" className="text-decoration-none text-white">
                                    Ways to Watch
                                </Link>
                            </li>
                            <li>
                                <Link to="/corporate-info" className="text-decoration-none text-white">
                                    Corporate Information
                                </Link>
                            </li>
                            <li>
                                <Link to="/only-on-netflix" className="text-decoration-none text-white">
                                    Only on Netflix
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3">
                        <ul className="list-unstyled" style={{ lineHeight: "2.5" }}>
                            <li>
                                <Link to="/media-centre" className="text-decoration-none text-white">
                                    Media Centre
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-use" className="text-decoration-none text-white">
                                    Terms of Use
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="text-decoration-none text-white">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/language" className="text-decoration-none text-white">
                                    A English
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="form-select text-white bg-transparent border-white"
                            style={{
                                marginRight: "20px",
                                fontSize: "1rem",
                                height: "35px",
                                width: "120px",
                                textAlign: "center", // Center text inside the dropdown
                                color: "white", // Text color white when not focused
                            }}
                        >
                            <option value="English">English</option>
                            <option value="Kannada">Kannada</option>
                            <option value="Telugu">Telugu</option>
                        </select>
                    </div>
                    <div></div>
                    <div className="m-3">
                        <p>Netflix India</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
