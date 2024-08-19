import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            await actions.getOrder(localStorage.getItem("token"));
            await actions.getUser(localStorage.getItem("token"));
            await actions.loadCart(localStorage.getItem("token"));
        }
        fetchData()

	}, []);
    console.log(store.user)
    return (
        <div className="card w-25">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{store.user.firstname}</li>
                <li class="list-group-item">{store.user.lastname}</li>
                <li class="list-group-item">{store.user.email}</li>
            </ul>
        </div>
    );
    
};