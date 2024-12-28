import Navbar from "../pages/navbar";
import Footer from "../pages/footer";

function Register() {
    return (
        <>
            <Navbar />
            <div className="register-container" style={styles.content}>
                <h2>Finish setting up your account</h2>
                <p>Netflix is personalised for you. Create a password to watch on any device at any time.</p>
                <button style={styles.button}>Next</button>
            </div>
            <Footer />
        </>
    );
}

const styles = {
    content: {
        textAlign: "center",
        margin: "100px auto",
        maxWidth: "500px",
        fontFamily: "Arial, sans-serif",
    },
    button: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px 20px",
        fontSize: "18px",
        cursor: "pointer",
    },
};

export default Register;
