import PropTypes from 'prop-types';
import React, { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Cart = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await actions.getOrder(localStorage.getItem("token"));
            await actions.loadCart(localStorage.getItem("token"));
        }
        fetchData()
	}, []);

    const handleAddToCart = (pizza) => {
		actions.addToCart(pizza.id, localStorage.getItem("token"))
        setCartItems()
	};

    const handleRemoveFromCart = async(orderItemId) => {
        const removed  = await actions.removeFromCart(orderItemId, localStorage.getItem("token"));
        if (removed){
            actions.loadCart(localStorage.getItem("token"));
        }
    };

   
    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <div className="cart-items gap-3">
                {store.cart.map((item, index) => (
                    <div key={index} className="cart-item d-flex align-items-center mb-4">
                        <img src={item.url} alt={item.name} className="img-fluid cart-img me-5" />
                        <div className='me-auto'>
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                            <span>Price: ${item.price * item.quantity}</span>
                            <div className='d-flex'>
                                <button className='btn btn-primary' >-</button>
                                <div className="">Quantity: {item.quantity}</div>
                                <button className='btn btn-primary' onClick={() => handleAddToCart(item)}>+</button>
                            </div>

                        </div>
                        <button 
                            className="btn btn-danger" 
                            onClick={() => handleRemoveFromCart(item.orderItem_Id)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-buttons">
                <button className="btn btn-primary me-2" onClick={() => navigate("/checkout")}>Go to checkout</button>
                <button className="btn btn-secondary" onClick={() => navigate("/home")}>Continue shopping</button>
            </div>
        </div>
    );
};

Cart.propTypes = {
	match: PropTypes.object
};
