// import React, { useEffect, useState } from "react";
// import { db } from "../auth/confing";
// import { ref, onValue, remove } from "firebase/database";

// const ProductList = () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const productRef = ref(db, "products");

//     onValue(productRef, (snapshot) => {
//       const val = snapshot.val();
//       setData(val || {});
//     });
//   }, []);

//   const handleDelete = (id) => {
//     const itemRef = ref(db, `products/${id}`);
//     remove(itemRef);
//   };

//   return (
//     <div>
//       <h2>Product List</h2>

//       {Object.entries(data).map(([id, item]) => (
//         <div key={id}>
//           {item.name} - ₹{item.price}
//           <button onClick={() => handleDelete(id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
