import React, { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const AllUsersManage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await actions.getAllUsers(localStorage.getItem("token"));
        }
        fetchData()
	}, []);
   console.log(store.allUsers)
    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="user-orders-title mt-5">Users</h2>
            <div className="user-orders-container row gap-2 mt-4">
                {store?.allUsers?.map((user, index) => (
                    <div key={index} className="user-card col-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                            <li className="list-group-item"><strong>First name:</strong> {user.firstname}</li>
                            <li className="list-group-item"><strong>Last name:</strong> {user.lastname}</li>
                            <li className="list-group-item"><strong>Id:</strong> {user.id}</li>
                            <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};