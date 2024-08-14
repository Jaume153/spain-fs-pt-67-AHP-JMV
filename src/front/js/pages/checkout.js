import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Checkout = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

   
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Checkout</h2>

            <div className="row">
                
                <div className="col-md-6">
                    <div className="order-summary mb-4">
                        <h4>Order Summary</h4>
                        <ul className="list-group mb-3">
                            {store.cart.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{item.pizza.name}</h5>
                                        <p className="mb-1">{item.pizza.description}</p>
                                    </div>
                                    <span className="text-muted">${item.pizza.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between">
                            <h4>Total:</h4>
                            <h4>${store.cart.reduce((acc, item) => acc + item.pizza.price, 0).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>

                
                <div className="col-md-6">
                    <h4>Payment Information</h4>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Shipping Address</label>
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" placeholder="City" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" className="form-control" id="state" placeholder="State" />
                            </div>
                        </div>

                                             <div className="mb-3">
                            <label htmlFor="card" className="form-label">Credit Card</label>
                            <input type="text" className="form-control" id="card" placeholder="Card number" />
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-4">
                                <label htmlFor="card-expiration" className="form-label">Expiration</label>
                                <input type="text" className="form-control" id="card-expiration" placeholder="MM/YY" />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="card-cvc" className="form-label">CVC</label>
                                <input type="text" className="form-control" id="card-cvc" placeholder="CVC" />
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary w-100" onClick={() => navigate("/confirmation")}>Place Order</button>
                    </form>
                </div>
            </div>
        </div>
    );
};