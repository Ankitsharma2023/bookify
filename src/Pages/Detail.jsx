import react from 'react';
import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useFirebase } from '../Context/Firebase';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


const BookDetail = () => {

    const params = useParams();
    const firebase = useFirebase();

    const [data,setData] = useState(null);
    const [qty,setQty] = useState(1);

    console.log(params);

useEffect(()=>{
     firebase.getBookById(params.bookId).then((value)=>{
        setData(value.data());
     }) 
},[]);

const placeOrder = async () => {
    try {
        const result = await firebase.placeOrder(params.bookId, qty);
        if (result.success) {
            alert('Order placed successfully!');
            // Optionally redirect or update UI
        } else {
            alert('Failed to place order: ' + result.error);
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    }
}

if(data == null) return <div>Loading...</div>

    return(
        <div>
            <h1>{data.name}</h1>
            <div>Book Detail</div>
            <h1>Details</h1>
            <h4>price Rs. {data.price}</h4>
            <h4>ISBN: {data.isbnNumber}</h4>
            <h1>Owner details</h1>
            <h4> Name: {data.displayName}</h4>
            <h4> Email: {data.userEmail}</h4>
            <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
        onChange = {(e)=>setQty(e.target.value)}
        value = {qty}
        type="number" placeholder="Enter Quantity" />
      </Form.Group>
            <Button onClick={placeOrder} variant = "success">Buy Now </Button>
        </div>
    )
}

export default BookDetail;