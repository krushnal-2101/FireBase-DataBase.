// import React, { useState } from "react";
// import { db } from "../auth/confing";
// import { ref, push } from "firebase/database";

// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");

//   const handleAdd = () => {
//     if (!name || !price) return;

//     const productRef = ref(db, "products");
//     push(productRef, {
//       name,
//       price,
//     })
//       .then(() => {
//         setName("");
//         setPrice("");
//       })
//       .catch((err) => {
//         console.error("Add product failed:", err);
//       });
//   };

//   return (
//     <div>
//       <h2>Add Product</h2>
//       <input
//         placeholder="Product name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <button onClick={handleAdd}>Add</button>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, push, onValue, remove, update } from "firebase/database";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState({});
  const [editId, setEditId] = useState(null);

  // 🔹 READ
  useEffect(() => {
    const studentRef = ref(db, "students");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      setList(data || {});
    });
  }, []);

  // 🔹 CREATE
  const addData = () => {
    if (name === "") return;

    push(ref(db, "students"), {
      name: name
    });

    setName("");
  };

  // 🔹 DELETE
  const deleteData = (id) => {
    remove(ref(db, "students/" + id));
  };

  // 🔹 EDIT CLICK
  const editData = (id, item) => {
    setName(item.name);
    setEditId(id);
  };

  // 🔹 UPDATE
  const updateData = () => {
    update(ref(db, "students/" + editId), {
      name: name
    });

    setName("");
    setEditId(null);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Firebase CRUD App</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      {editId ? (
        <button onClick={updateData}>Update</button>
      ) : (
        <button onClick={addData}>Add</button>
      )}

      <hr />

      {Object.entries(list).map(([id, item]) => (
        <div key={id} style={{ margin: 10 }}>
          <b>{item.name}</b>

          <button onClick={() => editData(id, item)}>Edit</button>
          <button onClick={() => deleteData(id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;




