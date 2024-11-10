import { createContext , useContext , useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword
    ,signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from 'firebase/auth';
import {  collection ,addDoc, getFirestore , getDocs , getDoc,doc, query , where  } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyD6m0VpYjhol1RaErqRngf_nUGvwNQa-pg",
    authDomain: "dummy-7f8fb.firebaseapp.com",
    projectId: "dummy-7f8fb",
    storageBucket: "dummy-7f8fb.firebasestorage.app",
    messagingSenderId: "221929451460",
    appId: "1:221929451460:web:223708ac79547b1270be91"
  };

  const firebaseApp = initializeApp(firebaseConfig);

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

const firebaseAuth  = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const GoogleProvider = new GoogleAuthProvider(); 
export const FirebaseProvider = (props) =>
{
const [user , setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
           if(user){
               setUser(user);
           }
               else{
                   setUser(null);
               }
        })
    },[]);
    const signUpUserWithEmailAndPassword = async (email,password) => {
        try{
            const user = await createUserWithEmailAndPassword(firebaseAuth,email,password);
            return user;
        }catch(err){
            return err;
        }
    }

    const signInUserWithEmailAndPass = async (email,password) => {
        try{
            const signIn = await signInWithEmailAndPassword(firebaseAuth,email,password);
            return signIn;
        }catch(err){
            return err;
        }
    }

    const signInWithGoogle = async () => {
        try{
            const Goog = await signInWithPopup(firebaseAuth,GoogleProvider);
            return Goog;
        }catch(err){
            return err;
        }
    }
    
    const handleCreateNewListing = async (name, isbnNumber, price) => {
        try {
            if (!user) throw new Error('User must be logged in to create a listing');
            
            const docRef = await addDoc(collection(firestore, 'books'), {
                name,
                isbnNumber,
                price,
                userId: user.uid,
                userEmail: user.email,
                displayName: user.displayName,
                createdAt: new Date().toISOString()
            });
            
            return { id: docRef.id, success: true };
        } catch (error) {
            console.error('Error creating new listing:', error);
            return { error: error.message, success: false };
        }
    }

    const listAllBooks = async () => {
    return getDocs(collection(firestore, 'books'));
    } 
//    WHEN I PASS BOOOK ID , IT RETURN PARTICULAR BOOK
    const getBookById = async (id) => {
    const docRef = doc (firestore, 'books', id);
    const result = await getDoc(docRef);
    return result;
    }
 
    //order placed 
    const placeOrder = async (bookId, qty) => {
        if (!user) throw new Error('User must be logged in to place order');
        
        // Correct path for subcollection
        const orderRef = collection(firestore, 'books', bookId, 'orders');
        
        try {
            const result = await addDoc(orderRef, {
                userId: user.uid,
                userEmail: user.email,
                displayName: user.displayName,
                qty: Number(qty),
                createdAt: new Date().toISOString()
            });
            return { success: true, orderId: result.id };
        } catch (error) {
            console.error('Error placing order:', error);
            return { success: false, error: error.message };
        }
    };

    const fetchMyBooks = async (userId) =>{
const collectionRef = collection(firestore,"books");
const q = query(collectionRef,where("userId","==",userId));
const result = await getDocs(q);
return result;
    }

    const getOrders = async(bookId) => {
        const collectionRef = collection(firestore, 'books', bookId, 'orders');
      const result = await getDocs(collectionRef);
      return result;
    }
const isLoggedIn = user ? true :false;
    return (
        <FirebaseContext.Provider value ={{signUpUserWithEmailAndPassword, signInUserWithEmailAndPass,signInWithGoogle,isLoggedIn , handleCreateNewListing, listAllBooks, getBookById, placeOrder,
        fetchMyBooks,
        user,
        getOrders
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}