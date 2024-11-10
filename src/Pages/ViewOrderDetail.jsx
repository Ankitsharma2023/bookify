import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import { useState } from "react";

const ViewOrderDetails = () => {
const params = useParams();
const firebase = useFirebase();

const [orders, setOrders] = useState([]);

useEffect(()=>{
firebase.getOrders(params.bookId).then(orders => setOrders(orders.docs))
},[])

    return (
        <div className="container mt-3">
        <h1>Orders</h1>
        <div>
            {orders.map((order) => {
                const data = order.data();
                return(
                   <div key= {order.id}className="mt-5 " style={{border:"1px solid",padding:"10px"}} >
                    <h5> Order By : {data.displayName}</h5>
                    <h5> Order Qty : {data.qty}</h5>
                    <h5> Order Email : {data.userEmail}</h5>
                    </div>
                );

        })}
        </div>
        </div>
    );
}

export default ViewOrderDetails;