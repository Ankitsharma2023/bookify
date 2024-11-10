import React , {useEffect, useState} from "react";
import { useFirebase } from "../Context/Firebase";
import BookCard from "../Components/Card";
import CardGroup from 'react-bootstrap/CardGroup';

const HomePage = () => {
const firebase = useFirebase();
const [books , setBooks ] = useState([]);

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs));
    },[]);
    return (
      <div className="container mt-5">
        <CardGroup>{
        
      books.map(books => 
        <BookCard link = {`/book/view/${books.id}`} key={books.id} id={books.id} {...books.data()}/>
      )
      }
      </CardGroup>
      </div>
    );
}

export default HomePage;