import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database"
import { useNavigate } from "react-router-dom"
const AuthContext = createContext(null)
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, Timestamp } from "firebase/firestore"
import { getStorage, ref as storageref, uploadBytes, getDownloadURL } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDf5PilNTqbay8a1sOqi_VZUoYwombhCAw",
    authDomain: "database-51c58.firebaseapp.com",
    projectId: "database-51c58",
    storageBucket: "database-51c58.appspot.com",
    messagingSenderId: "1024646477059",
    appId: "1:1024646477059:web:ce7d8721ffd18f4628a536",
    databaseURL: "https://database-51c58-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const store = getFirestore(app)
const storage = getStorage(app)




export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [bookCart, setBookCart] = useState(localStorage.getItem("mycart") ? JSON.parse(localStorage.getItem("mycart")) : [])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                navigate("/")
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                });
            }
            else {
                setUser(null)
                navigate("/login")
            }
        })
    }, [])

    const isLoggedIn = user ? true : false;

    const signUpUserWithEmailandPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const putData = (key, data) => {
        return set(ref(db, key), data)
    }

    const signing = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // const signWithGoogle = () => {
    //     return signInWithPopup(auth, googleProvider)
    // }

    const userSignOut = () => {
        return signOut(auth)
    }

    const addNewBook = async (name, author, price, image, genres) => {
        const imageref = storageref(storage, `uploads/images/${Date.now()}-${image.name}`)
        const uploadresult = await uploadBytes(imageref, image)
        return await addDoc(collection(store, "books"), {
            name,
            author,
            price,
            genres,
            image: uploadresult.ref.fullPath
        })
    }

    const addOrders = async (orderdata) => {
        return await addDoc(collection(store, "orders"), orderdata)
    }

    const getImageUrl = path => {
        return getDownloadURL(storageref(storage, path))
    }

    const getAllBooks = () => {
        return getDocs(collection(store, "books"))
    }

    const getBookById = async (id) => {
        const docref = doc(store, "books", id)
        const result = await getDoc(docref)
        return result;
    }

    const getAllOrers = async ()=>{
        return getDocs(collection(store, "orders"))
    }




    return (
        <AuthContext.Provider value={{ signUpUserWithEmailandPassword, putData, signing, toast, Toaster, navigate, isLoggedIn, userSignOut, addNewBook, getAllBooks, getImageUrl, getBookById, bookCart, setBookCart, user, Timestamp, addOrders,getAllOrers }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useFirebase = () => useContext(AuthContext);