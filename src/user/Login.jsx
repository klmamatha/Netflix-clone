import { useState } from "react";
import { Link } from "react-router-dom";
import background from "../images/Netflix.webp";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let [userinfo, setInfo] = useState({});
    let [message, setMessage] = useState("Enter Login Details");
    let [rememberMe, setRememberMe] = useState(false);
    let [showMore, setShowMore] = useState(false);

    const pickValue = (obj) => {
        userinfo[obj.target.name] = obj.target.value;
        setInfo({ ...userinfo });
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const navigate = useNavigate();

    const loginCheck = (frmobj) => {
        frmobj.preventDefault();
        setMessage("Please wait Validating...");

        let url = "http://localhost:1234/userapi";
        fetch(url)
            .then(response => response.json())
            .then(info => {
                let userfound = false;
                info.map((user) => {
                    if (user.email === userinfo.email && user.password === userinfo.password) {
                        userfound = true;
                        setMessage("Login Success : Redirecting...");
                        localStorage.setItem("userid", user.id);
                        localStorage.setItem("fullname", user.fname);
                        localStorage.setItem("usertype", user.type);

                        // Use navigate for redirecting
                        navigate('/profile');
                    }
                });

                if (userfound === false) {
                    setMessage("Login Fail : Invalid or Not Exists");
                }
            });

    }

    return (
        <div
            className="position-relative d-flex justify-content-center align-items-center text-white"
            style={{
                height: "100vh",
                width: "100vw",
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="row w-90">
                <div className="col-xl-1"></div>
                <div className="col-xl-10 m-5">
                    <p className="text-center text-danger mb-4">{message}</p>
                    <form onSubmit={loginCheck}>
                        <div
                            className="card position-relative mx-auto"
                            style={{
                                width: "450px",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                zIndex: 1,
                            }}
                        >
                            <div className="card-header text-white text-center">
                                <i className="text-white"></i> Sign in
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-white">
                                        Email Id
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email Address or mobile"
                                        className="form-control"
                                        style={{ width: "90%", margin: "0 auto", padding: "10px" }}
                                        onChange={pickValue}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        style={{ width: "90%", margin: "0 auto", padding: "10px" }}
                                        onChange={pickValue}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                        onChange={toggleRememberMe}
                                        checked={rememberMe}
                                    />
                                    <label htmlFor="rememberMe" className="form-check-label text-white">
                                        Remember me
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-danger"
                                        style={{ width: "90%", margin: "0 auto", padding: "10px" }}
                                        type="submit"
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <div>
                                    <p className="text-white text-center">OR</p>
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-secondary"
                                        style={{ width: "90%", margin: "0 auto", padding: "10px" }}
                                    >
                                        Use a sign-in code
                                    </button>
                                </div>
                                <div>
                                    <span>
                                        <p className="text-white">
                                            New to Netflix?
                                            <Link to="/signup"> Sign up now.</Link>
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <div className="card-footer text-white small">
                                <p>
                                    This page is protected by Google reCAPTCHA to ensure you are not a bot.
                                    {showMore ? (
                                        <span>
                                            {" "}
                                            The information collected by Google reCAPTCHA is subject to the
                                            Google Privacy Policy and Terms of Service, and is used for
                                            providing, maintaining, and improving the reCAPTCHA service and
                                            for general security purposes (it is not used for personalised
                                            advertising by Google).
                                        </span>
                                    ) : null}
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none text-white small"
                                    onClick={toggleShowMore}
                                >
                                    {showMore ? "See less" : "See more"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-xl-1"></div>
            </div>
        </div>
    );
};

export default Login;
