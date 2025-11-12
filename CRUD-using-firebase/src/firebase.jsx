import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKfePisZ3K3oAFQpysHHmJNcgp7M9t_Hg",
  authDomain: "basic-crud-33c15.firebaseapp.com",
  projectId: "basic-crud-33c15",
  storageBucket: "basic-crud-33c15.firebasestorage.app",
  messagingSenderId: "1058003918677",
  appId: "1:1058003918677:web:7cb566b0535bf47d3699dc",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
