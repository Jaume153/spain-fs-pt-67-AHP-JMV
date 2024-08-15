import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Checkout = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

   
    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="checkout-title mt-5">Checkout</h2>
    
            <form className="container justify-content-center d-flex h-100 align-items-center">
                <div className="checkout-card p-4 mt-5" style={{ width: '500px' }}>
                    <div className="checkout-order-summary mb-4">
                        <h4>Order Summary</h4>
                        <ul className="list-group mb-3">
                            {store.cart.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="mb-1">{item.description}</p>
                                    </div>
                                    <span className="text-muted">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between">
                            <h4>Total:</h4>
                            <h4>${store.cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h4>
                        </div>
                    </div>
    
                    <h4>Payment Information</h4>
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
    
                    <div className="choose-payment-method"><h4>Choose Payment Method</h4></div>
                    <div className="checkout-payment-methods mb-3">
                        <div className="payment-logo-group d-flex justify-content-between">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentMethod" id="googlePay" />
                                <label className="form-check-label" htmlFor="googlePay">
                                    <img src="google-pay-logo-url" alt="Google Pay" className="payment-logo" />
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentMethod" id="shopPay" />
                                <label className="form-check-label" htmlFor="shopPay">
                                    <img src="shop-pay-logo-url" alt="Shop Pay" className="payment-logo" />
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" />
                                <label className="form-check-label" htmlFor="paypal">
                                    <img src="paypal-logo-url" alt="PayPal" className="payment-logo" />
                                </label>
                            </div>
                        </div>
                        <div className="payment-text-group d-flex justify-content-between mt-3">
                            <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="cashOnDelivery" />
                                <label className="form-check-label" htmlFor="cashOnDelivery">
                                    Cash on Delivery
                                </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" />
                                <label className="form-check-label" htmlFor="creditCard">
                                    Credit Card
                                </label>
                            </div>
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
    
                    <button type="button" className="btn btn-beige w-100 mb-3" onClick={() => navigate("/confirmation")}>Place Order</button>
                    <button type="button" className="btn btn-beige w-100" onClick={() => navigate("/cart")}>Go back</button>
                </div>
            </form>
        </div>
    );
    
};