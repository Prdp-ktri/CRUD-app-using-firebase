import { useState } from "react";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebase";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  const usersCollectionRef = collection(db, "users");

  // create
  const createUser = async () => {
    if (!newName || !newAge) return alert("Please fill all fields!");
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    setNewName("");
    setNewAge("");
    setUsers();
  };

  // read
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);

  // update
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  // delete
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Firebase CRUD App</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />{" "}
          <br />
          <input
            type="number"
            placeholder="Enter Age"
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />{" "}
          <br />
          <button onClick={createUser}>Create User</button>
        </div>

        <h2>Users List</h2>
        {users?.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              display: "inline-block",
            }}
          >
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <button onClick={() => updateUser(user.id, user.age)}>
              +1 Age
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
