import { createContext , useContext , useState, useEffect} from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword
    ,signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from 'firebase/auth';
import {  collection ,addDoc, getFirestore , getDocs } from "firebase/firestore";

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

const isLoggedIn = user ? true :false;
    return (
        <FirebaseContext.Provider value ={{signUpUserWithEmailAndPassword, signInUserWithEmailAndPass,signInWithGoogle,isLoggedIn , handleCreateNewListing, listAllBooks}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}