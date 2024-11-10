import React from "react";
import { useFirebase } from "../Context/Firebase";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "../Components/Card";
const OrderPage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid)
        ?.then((books) => {
            setBooks(books.docs);
        });
    }, [firebase]);

    if(!firebase.isLoggedIn) return <div> Please login first </div>
    console.log(books);
    return (
        <div>
            {books.map(book=> <BookCard link ={`/books/orders/${book.id}`}key={book.id} id={book.id} {...book.data()} />)}

        </div>
    );
}

export default OrderPage;