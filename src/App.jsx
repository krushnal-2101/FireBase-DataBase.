import React, { useState } from "react";
import StudentManagement from "./components/StudentManagement";
import ProductManagement from "./components/ProductManagement";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-primary">
            🔥 Firebase CRUD Application
          </h1>
          <p className="text-muted">Complete Create, Read, Update, Delete Operations</p>
        </div>

        {/* Tabs Navigation */}
        <div className="card mb-4">
          <div className="card-header p-0">
            <ul className="nav nav-tabs nav-fill" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "students" ? "active" : ""}`}
                  onClick={() => setActiveTab("students")}
                  type="button"
                >
                  👨‍🎓 Student Management
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "products" ? "active" : ""}`}
                  onClick={() => setActiveTab("products")}
                  type="button"
                >
                  📦 Product Management
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "students" && <StudentManagement />}
          {activeTab === "products" && <ProductManagement />}
        </div>

        {/* Footer */}
        <div className="text-center mt-5 text-muted">
          <p>
            <strong>Firebase Realtime Database</strong> - All operations sync in real-time
          </p>
          <p className="small">
            Features: Create • Read • Update • Delete • Search • Filter • Statistics
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;