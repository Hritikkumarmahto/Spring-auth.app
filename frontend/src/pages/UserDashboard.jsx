import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../Services/productService";
import authService from "../Services/AuthService";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await productService.searchProducts(searchTerm);
        setProducts(response.data);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      loadProducts();
    }
  };

  const user = authService.getCurrentUser();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>User Dashboard</h1>
        <div style={styles.headerRight}>
          <span style={styles.userName}>Welcome, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchBtn}>
          Search
        </button>
        <button onClick={loadProducts} style={styles.clearBtn}>
          Clear
        </button>
      </div>

      <div style={styles.info}>
        <p>📋 Total Products: {products.length}</p>
        <p>👀 You have view-only access</p>
      </div>

      <div style={styles.productsGrid}>
        {products.length === 0 ? (
          <p style={styles.noProducts}>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.productHeader}>
                <h3>{product.name}</h3>
                <span
                  style={
                    product.quantity > 10
                      ? styles.stockHigh
                      : product.quantity > 0
                      ? styles.stockLow
                      : styles.stockOut
                  }
                >
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <p style={styles.description}>{product.description}</p>
              <div style={styles.productDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Category:</span>
                  <span>{product.category}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Quantity:</span>
                  <span style={styles.quantityBadge}>{product.quantity}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Price:</span>
                  <span style={styles.price}>${product.price}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  headerRight: { display: "flex", gap: "15px", alignItems: "center" },
  userName: { fontWeight: "600", color: "#555" },
  logoutBtn: {
    padding: "8px 20px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
  searchContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
  searchInput: {
    flex: 1,
    padding: "12px 15px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  searchBtn: {
    padding: "12px 25px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  clearBtn: {
    padding: "12px 25px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  info: {
    background: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    gap: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  noProducts: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "40px",
    color: "#999",
    fontSize: "1.2rem",
  },
  productCard: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
    cursor: "default",
  },
  productHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: "15px",
  },
  stockHigh: {
    background: "#d4edda",
    color: "#155724",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  stockLow: {
    background: "#fff3cd",
    color: "#856404",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  stockOut: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  description: { color: "#666", marginBottom: "20px", lineHeight: "1.6" },
  productDetails: { display: "flex", flexDirection: "column", gap: "12px" },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  label: { fontWeight: "600", color: "#555" },
  quantityBadge: {
    background: "#e7f3ff",
    color: "#0066cc",
    padding: "4px 12px",
    borderRadius: "15px",
    fontWeight: "600",
  },
  price: { fontSize: "1.3rem", fontWeight: "bold", color: "#28a745" },
};

export default UserDashboard;
