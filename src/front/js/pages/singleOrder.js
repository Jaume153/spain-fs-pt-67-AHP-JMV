import PropTypes from 'prop-types';
import React, { useContext, useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const SingleOrder = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const {order_id} = useParams()
    useEffect(() => {
        async function fetchData() {
            await actions.getSingleOrder(localStorage.getItem("token"), order_id)
        }
        fetchData()
	}, []);
   
    return (
        <div className="container mt-5">
            <h2>Order nº: {order_id} </h2>
            <div className="cart-items gap-3">
                {store.singleOrder.map((item, index) => (
                    <div key={index} className="cart-item d-flex align-items-center mb-4">
                        <img src={item.url} alt={item.name} className="img-fluid cart-img me-5" />
                        <div className='me-auto description-cart'>
                            <h5 className='price-cart'>{item.name}</h5>
                            <p >{item.description}</p>
                            <span className='price-cart'>{item.price * item.quantity}$</span>
                        </div>
                        <div className='d-flex'>
                            <div className="input-group mb-3">
                                <button className="input-group-text" onClick={() => handleRemoveFromCart(item.id)}>-</button>
                                <div type="text" className="form-control" aria-label="Amount (to the nearest dollar)">{item.quantity}</div>
                                <button className="input-group-text" onClick={() => handleAddToCart(item)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};