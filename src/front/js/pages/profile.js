import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            await actions.getUser(localStorage.getItem("token"));
        }
        fetchData()
	}, []);
    
    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="profile-title mt-5">Your profile</h2>
            <div className="profile-card p-4 mt-5">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>First Name:</strong> {store.user.firstname}</li>
                    <li className="list-group-item"><strong>Last Name:</strong> {store.user.lastname}</li>
                    <li className="list-group-item"><strong>Email:</strong> {store.user.email}</li>
                </ul>
            </div>
        </div>
    );
};