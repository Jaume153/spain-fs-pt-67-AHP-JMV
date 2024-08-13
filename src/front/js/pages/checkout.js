import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Checkout = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

   
    return (
        <div className="container mt-5">
            <h2>Checkout</h2>
            <div className="order-summary">
                <h4>Order Summary</h4>
                <ul className="list-group">
                    {store.cart.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{item.pizza.name}</h5>
                                <p>{item.pizza.description}</p>
                            </div>
                            <span>Price: ${item.pizza.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="total mt-4">
                <h4>Total: ${store.cart.reduce((acc, item) => acc + item.pizza.price, 0)}</h4>
            </div>
            <div className="checkout-buttons mt-4">
                <button className="btn btn-primary" onClick={() => navigate("/confirmation")}>Place Order</button>
                <button className="btn btn-secondary" onClick={() => navigate("/cart")}>Cancel</button>
            </div>
        </div>
    );
};
