import PropTypes from 'prop-types';
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Cart = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    // const handleCheckout = () => {
    //     navigate("/checkout");
    // };

   
    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {store.cart?.map((pizza, index) => (
                    <div key={index} className="cart-item">
                        <img src={pizza.url} alt={pizza.name} className="img-fluid cart-img" />
                        <h5>{pizza.name}</h5>
                        <p>{pizza.description}</p>
                        <span>Price: ${pizza.price}</span>
                    </div>
                ))}
            </div>
            <div className="cart-buttons mt-4">
                <button className="btn btn-primary me-2">Go to checkout</button>
                <button className="btn btn-secondary" onClick={(e)=>{navigate("/home")}}>Continue shopping</button>
				<button className="btn btn-danger">Remove to cart</button> 
            </div>
        </div>
    );
};

Cart.propTypes = {
	match: PropTypes.object
};
