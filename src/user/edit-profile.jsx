import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserNav from "./UserNav";
import Footer from "../pages/footer";

const EditProfile = () => {
    const [step, setStep] = useState(1);
    const [userinfo, setUserinfo] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    // Fetch current user info (mock API call for demo purposes)
    useEffect(() => {
        // Ideally, fetch user info from the API or localStorage
        const currentUser = JSON.parse(localStorage.getItem("user")); // or fetch from your API
        setUserinfo(currentUser);
        setProfileImage(currentUser.profileImage);
    }, []);

    // Update user info
    const pickValue = (e) => setUserinfo({ ...userinfo, [e.target.name]: e.target.value });

    // Handle profile image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Assign default image if no image uploaded
    const getDefaultImage = () => {
        if (userinfo.gender === "Male") {
            return "/src/image/male.jpeg";
        } else if (userinfo.gender === "Female") {
            return "/src/image/female.jpeg";
        }
        return null; // Handle if gender is not selected
    };

    // Navigation steps
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    // Submit form
    const save = (e) => {
        e.preventDefault();
        const imageToSave = profileImage || getDefaultImage();
        const postdata = {
            ...userinfo,
            profileImage: imageToSave,
        };

        const url = "http://localhost:1234/userapi";
        fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "put", // Changed to "put" to update data
            body: JSON.stringify(postdata),
        })
            .then((response) => response.json())
            .then(() => {
                alert(userinfo.fname + " - Profile Updated Successfully!");
                navigate("/profile"); // Redirect to profile page
            });
    };

    return (
        <>
            {/* Navbar */}
            <UserNav />

            {/* Main Content */}
            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 m-5">
                        <form onSubmit={save}>
                            <div className="card shadow-sm">
                                <div className="card-header">
                                    Step {step} of 4
                                    <Link to="/profile" className="float-end text-primary">
                                        View Profile
                                    </Link>
                                </div>
                                <div className="card-body">
                                    {/* Step 1 */}
                                    {step === 1 && (
                                        <>
                                            <h4>Edit your profile</h4>
                                            <div className="mb-3">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="fname"
                                                    value={userinfo.fname || ""}
                                                    placeholder="Enter full name"
                                                    onChange={pickValue}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Mobile Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="mobile"
                                                    value={userinfo.mobile || ""}
                                                    placeholder="Enter mobile number"
                                                    onChange={pickValue}
                                                />
                                            </div>
                                            <button type="button" className="btn btn-danger" onClick={nextStep}>
                                                Next
                                            </button>
                                        </>
                                    )}

                                    {/* Step 2 */}
                                    {step === 2 && (
                                        <>
                                            <h4>Provide your login details</h4>
                                            <div className="mb-3">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={userinfo.email || ""}
                                                    placeholder="Enter your email"
                                                    onChange={pickValue}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    onChange={pickValue}
                                                />
                                            </div>
                                            <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
                                                Back
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={nextStep}>
                                                Next
                                            </button>
                                        </>
                                    )}

                                    {/* Step 3 */}
                                    {step === 3 && (
                                        <>
                                            <h4>Additional Information</h4>
                                            <div className="mb-3">
                                                <label>Gender</label>
                                                <select
                                                    className="form-select"
                                                    name="gender"
                                                    value={userinfo.gender || ""}
                                                    onChange={pickValue}
                                                >
                                                    <option>Choose</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label>Date of Birth</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="dob"
                                                    value={userinfo.dob || ""}
                                                    onChange={pickValue}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Education</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="education"
                                                    value={userinfo.education || ""}
                                                    placeholder="Enter education details"
                                                    onChange={pickValue}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Profile Picture</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                            <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
                                                Back
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={nextStep}>
                                                Next
                                            </button>
                                        </>
                                    )}

                                    {/* Step 4 */}
                                    {step === 4 && (
                                        <>
                                            <h4>Confirm Your Details</h4>
                                            <p>Full Name: {userinfo.fname}</p>
                                            <p>Gender: {userinfo.gender}</p>
                                            <p>Mobile: {userinfo.mobile}</p>
                                            <p>Email: {userinfo.email}</p>
                                            <p>Date of Birth: {userinfo.dob}</p>
                                            <p>Education: {userinfo.education}</p>
                                            <img
                                                src={profileImage || getDefaultImage()}
                                                alt="Profile Preview"
                                                className="img-thumbnail"
                                                style={{ width: "150px" }}
                                            />
                                            <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
                                                Back
                                            </button>
                                            <button type="submit" className="btn btn-success">
                                                Update Profile
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default EditProfile;
