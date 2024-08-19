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
        <div className="container row gap-2">
            {store?.allOrders?.map((ingredient, index) => (
                <div class="card col-3" onClick={() => seeSingleOrder(ingredient.id)}>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Order number: {ingredient.id}</li>
                    <li class="list-group-item">Payment method: {ingredient.payment_method}</li>
                    <li class="list-group-item">Status: {ingredient.status}</li>
                    </ul>
              </div>
            ))}
        </div>
    );
    
};