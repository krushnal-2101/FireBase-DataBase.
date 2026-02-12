import React, { useEffect, useState } from "react";
import { db } from "../auth/config";
import { ref, onValue, remove, update, push } from "firebase/Firestore";

const ProductList = () => {
  const [data, setData] = useState({});
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    const productRef = ref(db, "products");

    onValue(productRef, (snapshot) => {
      const val = snapshot.val();
      setData(val || {});
    });
  }, []);

  const handleAdd = () => {
    if (newName.trim() === "" || newPrice.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    push(ref(db, "products"), {
      name: newName.trim(),
      price: newPrice.trim(),
      createdAt: new Date().toISOString()
    });

    setNewName("");
    setNewPrice("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const itemRef = ref(db, `products/${id}`);
      remove(itemRef);
    }
  };

  const startEdit = (id, item) => {
    setEditId(id);
    setEditName(item.name);
    setEditPrice(item.price);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditPrice("");
  };

  const handleUpdate = (id) => {
    if (editName.trim() === "" || editPrice.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    update(ref(db, `products/${id}`), {
      name: editName.trim(),
      price: editPrice.trim(),
      updatedAt: new Date().toISOString()
    });

    cancelEdit();
  };

  return (
    <div className="container">
      <div className="card shadow-lg" style={{
        borderRadius: "15px",
        border: "none",
        background: "white"
      }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="card-title mb-0 fw-bold" style={{ color: "#764ba2" }}>
              📦 Product Management
            </h2>
            <span className="badge" style={{
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              padding: "0.5rem 1rem",
              fontSize: "0.9rem"
            }}>
              {Object.entries(data).length} Products
            </span>
          </div>

          {/* Add New Product Form */}
          <div className="card mb-4 border-0 shadow-sm" style={{
            borderRadius: "10px",
            background: "linear-gradient(135deg, #f8f9fa 0%, #fff 100%)"
          }}>
            <div className="card-body p-4">
              <h5 className="fw-semibold mb-3" style={{ color: "#764ba2" }}>➕ Add New Product</h5>
              <div className="row g-3">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control border-0 shadow-sm py-2"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Product name..."
                    style={{ background: "white" }}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control border-0 shadow-sm py-2"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Price..."
                    style={{ background: "white" }}
                  />
                </div>
                <div className="col-md-3">
                  <button
                    className="btn w-100 fw-semibold border-0 py-2"
                    onClick={handleAdd}
                    style={{
                      background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                      color: "white"
                    }}
                  >
                    ➕ Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr style={{ opacity: "0.1" }} />

          {/* Product List */}
          {Object.entries(data).length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "4rem", opacity: "0.3" }}>📦</div>
              <p className="text-muted mt-3">No products available</p>
              <p className="text-muted small">Start by adding your first product above</p>
            </div>
          ) : (
            <div className="row g-3">
              {Object.entries(data).map(([id, item], index) => (
                <div key={id} className="col-md-6">
                  <div 
                    className="card shadow-sm border-0 h-100"
                    style={{
                      borderRadius: "10px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 16px rgba(118, 75, 162, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div className="card-body p-3">
                      {editId === id ? (
                        <div className="row g-2">
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control border-0 mb-2 shadow-sm"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder="Product name"
                              style={{ background: "#f8f9fa" }}
                            />
                          </div>
                          <div className="col-12">
                            <input
                              type="number"
                              className="form-control border-0 mb-3 shadow-sm"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              placeholder="Price"
                              style={{ background: "#f8f9fa" }}
                            />
                          </div>
                          <div className="col-6">
                            <button
                              className="btn w-100 btn-sm fw-semibold border-0"
                              onClick={() => handleUpdate(id)}
                              style={{
                                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                                color: "white"
                              }}
                            >
                              ✓ Save
                            </button>
                          </div>
                          <div className="col-6">
                            <button
                              className="btn btn-light w-100 btn-sm fw-semibold"
                              onClick={cancelEdit}
                            >
                              ✕ Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-2">
                                <div style={{
                                  width: "35px",
                                  height: "35px",
                                  borderRadius: "8px",
                                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginRight: "0.75rem"
                                }}>
                                  <span style={{ fontSize: "1.2rem" }}>📦</span>
                                </div>
                                <div>
                                  <h5 className="mb-0 fw-bold" style={{ color: "#2d3748" }}>
                                    {item.name}
                                  </h5>
                                  {item.createdAt && (
                                    <small className="text-muted">
                                      Added: {new Date(item.createdAt).toLocaleDateString()}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="badge px-3 py-2" style={{
                                  background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
                                  fontSize: "1rem",
                                  fontWeight: "600"
                                }}>
                                  ₹{item.price}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm flex-grow-1 fw-semibold border-0"
                              onClick={() => startEdit(id, item)}
                              style={{
                                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                                color: "white"
                              }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-sm flex-grow-1 fw-semibold border-0"
                              onClick={() => handleDelete(id)}
                              style={{
                                background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
                                color: "white"
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;