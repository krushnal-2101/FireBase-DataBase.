import React, { useEffect, useState } from "react";
import { db } from "../auth/config";
import { ref, push, onValue, remove, update } from "firebase/firestore";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState({});
  const [editId, setEditId] = useState(null);

  // READ - Fetch students from Firebase
  useEffect(() => {
    const studentRef = ref(db, "students");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      setList(data || {});
    });
  }, []);

  // CREATE - Add new student
  const addData = () => {
    if (name.trim() === "") {
      alert("Please enter a name");
      return;
    }

    push(ref(db, "students"), {
      name: name.trim(),
      createdAt: new Date().toISOString()
    });

    setName("");
  };

  // DELETE - Remove student
  const deleteData = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      remove(ref(db, "students/" + id));
    }
  };

  // EDIT - Prepare for update
  const editData = (id, item) => {
    setName(item.name);
    setEditId(id);
  };

  // UPDATE - Save changes
  const updateData = () => {
    if (name.trim() === "") {
      alert("Please enter a name");
      return;
    }

    update(ref(db, "students/" + editId), {
      name: name.trim(),
      updatedAt: new Date().toISOString()
    });

    setName("");
    setEditId(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    setName("");
    setEditId(null);
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
            <h2 className="card-title mb-0 fw-bold" style={{ color: "#667eea" }}>
              👨‍🎓 Student Management
            </h2>
            <span className="badge bg-primary" style={{
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              padding: "0.5rem 1rem",
              fontSize: "0.9rem"
            }}>
              {Object.entries(list).length} Students
            </span>
          </div>

          <div className="mb-4">
            <div className="input-group shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
              <input
                type="text"
                className="form-control border-0 py-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name..."
                style={{
                  fontSize: "1rem",
                  background: "#f8f9fa"
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    editId ? updateData() : addData();
                  }
                }}
              />
              <button 
                className={`btn px-4 fw-semibold border-0`}
                onClick={editId ? updateData : addData}
                style={{
                  background: editId ? "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)" : "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  color: "white"
                }}
              >
                {editId ? "✓ Update" : "+ Add Student"}
              </button>
              {editId && (
                <button 
                  className="btn btn-light px-4 fw-semibold border-0"
                  onClick={cancelEdit}
                >
                  ✕ Cancel
                </button>
              )}
            </div>
          </div>

          <hr style={{ opacity: "0.1" }} />

          <div className="mt-4">
            {Object.entries(list).length === 0 ? (
              <div className="text-center py-5">
                <div style={{ fontSize: "4rem", opacity: "0.3" }}>📚</div>
                <p className="text-muted mt-3">No students added yet</p>
                <p className="text-muted small">Start by adding your first student above</p>
              </div>
            ) : (
              <div className="row g-3">
                {Object.entries(list).map(([id, item], index) => (
                  <div key={id} className="col-12">
                    <div 
                      className="card shadow-sm border-0 h-100"
                      style={{
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        background: `linear-gradient(135deg, ${index % 2 === 0 ? '#f8f9fa' : '#fff'} 0%, #fff 100%)`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 16px rgba(102, 126, 234, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <div className="card-body d-flex justify-content-between align-items-center py-3 px-4">
                        <div className="d-flex align-items-center">
                          <div className="me-3" style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold"
                          }}>
                            {item.name.charAt(0).toUpperCase()}
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
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-sm px-3 fw-semibold border-0"
                            onClick={() => editData(id, item)}
                            style={{
                              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                              color: "white"
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm px-3 fw-semibold border-0"
                            onClick={() => deleteData(id)}
                            style={{
                              background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
                              color: "white",
                              marginLeft: "0.5rem"
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;