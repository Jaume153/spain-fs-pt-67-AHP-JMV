import PropTypes from 'prop-types';
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Cart = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

  
    useEffect(() => {
        async function fetchData() {
            await actions.getOrder(localStorage.getItem("token"));
            await actions.loadCart(localStorage.getItem("token"));
        }
        fetchData()
	}, []);

    const handleRemoveFromCart = (orderItemId) => {
        actions.removeFromCart(orderItemId);
    };

   
    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {store.cart.map((item, index) => (
                    <div key={index} className="cart-item d-flex justify-content-between align-items-center">
                        <img src={item.url} alt={item.name} className="img-fluid cart-img" />
                        <div>
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                            <span>Price: ${item.price}</span>
                        </div>
                        <button 
                            className="btn btn-danger" 
                            onClick={() => handleRemoveFromCart(item.id)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-buttons mt-4">
                <button className="btn btn-primary me-2" onClick={() => navigate("/checkout")}>Go to checkout</button>
                <button className="btn btn-secondary" onClick={() => navigate("/home")}>Continue shopping</button>
            </div>
        </div>
    );
};

Cart.propTypes = {
	match: PropTypes.object
};
