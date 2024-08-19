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
        <div>
            <div className="card w-25">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{store.user.firstname}</li>
                    <li className="list-group-item">{store.user.lastname}</li>
                    <li className="list-group-item">{store.user.email}</li>
                </ul>
            </div>
            <button className="btn btn-beige" onClick={()=> {navigate("/home")}}>Home</button>
        </div>
    );
    
};