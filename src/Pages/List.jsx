import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useFirebase } from "../Context/Firebase";

const ListingPage = () => {
    const firebase = useFirebase(); // Moved inside component
    
    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
    };

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Book Name"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        onChange={(e) => setIsbnNumber(e.target.value)}
                        value={isbnNumber}
                        type="text" 
                        placeholder="ISBN Number"
                    />
                </Form.Group>
     
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        type="text" 
                        placeholder="Enter Price"
                    />
                </Form.Group>

      
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default ListingPage;