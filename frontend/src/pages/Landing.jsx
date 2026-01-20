import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Inventory Management System</h1>
        <p style={styles.description}>
          Manage your inventory efficiently with our comprehensive system. Track
          products, manage stock levels, and streamline your operations.
        </p>
        <div style={styles.features}>
          <div style={styles.feature}>
            <h3>📦 Product Management</h3>
            <p>Add, update, and delete products with ease</p>
          </div>
          <div style={styles.feature}>
            <h3>📊 Real-time Tracking</h3>
            <p>Monitor inventory levels in real-time</p>
          </div>
          <div style={styles.feature}>
            <h3>🔒 Secure Access</h3>
            <p>Role-based authentication for admins and users</p>
          </div>
        </div>
        <div style={styles.buttons}>
          <button onClick={() => navigate("/login")} style={styles.loginButton}>
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={styles.registerButton}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  content: {
    maxWidth: "900px",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  feature: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "30px",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
  },
  buttons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  loginButton: {
    padding: "15px 40px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#667eea",
    background: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "transform 0.2s",
    minWidth: "150px",
  },
  registerButton: {
    padding: "15px 40px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "white",
    background: "transparent",
    border: "2px solid white",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "transform 0.2s",
    minWidth: "150px",
  },
};

export default Landing;
