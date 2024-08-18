import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faGooglePay, faShopify, faCcVisa, faMoneyBillAlt } from '@fortawesome/free-brands-svg-icons';

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleCheckout = async() => {
        const result = await actions.checkout(localStorage.getItem("token"))
        if (result) {
            navigate("/home")
        }
    }
    useEffect(() => {
        async function fetchData() {
            await actions.getOrder(localStorage.getItem("token"));
            await actions.loadCart(localStorage.getItem("token"));
        }
        fetchData()
	}, []);
   
    return (
        <div>A</div>
    );
    
};