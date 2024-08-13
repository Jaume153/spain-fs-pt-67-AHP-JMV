import React from "react";
import { useNavigate } from "react-router-dom";



export const Confirmation = () => {
    const navigate = useNavigate();
   
   
    return (
        <div className="container mt-5 text-center">
            <h2>Order Successfully Placed!</h2>
            <p>Your order has been placed successfully. You will receive it shortly.</p>
            <button className="btn btn-secondary" onClick={() => navigate("/home")}>Go home</button>
        </div>
    
    );
};
