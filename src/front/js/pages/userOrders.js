import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const UserOrders = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            await actions.getAllOrders(localStorage.getItem("token"));
        }
        fetchData()

	}, []);

    const seeSingleOrder = async(order_id) => {
        await actions.getSingleOrder(localStorage.getItem("token"), order_id)
        navigate(`/orders/order/${order_id}`)
    }
    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="user-orders-title mt-5">Your Orders</h2>
            <div className="user-orders-container row gap-2 mt-4">
                {store?.allOrders?.map((order, index) => (
                    <div key={index} className="user-order-card col-3" onClick={() => seeSingleOrder(order.id)}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Order number:</strong> {order.id}</li>
                            <li className="list-group-item"><strong>Payment method:</strong> {order.payment_method}</li>
                            <li className="list-group-item"><strong>Status:</strong> {order.status}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );

};  