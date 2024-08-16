import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'



export const Navbar = () => {

	const { store } = useContext(Context);
    const navigate = useNavigate();
    const cartCount = store.cart.length;

	
	return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <img className="logo" src='https://res.cloudinary.com/didd1mjsp/image/upload/v1723140966/Untitled-2_n4lggj.png' alt="Logo" />
                </Link>
                <div className="ml-auto d-flex align-items-center">
                    <button className="btn btn-outline-dark me-3 position-relative" onClick={() => navigate("/cart")}>
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        <span className="cart-count badge bg-secondary position-absolute top-0 start-100 translate-middle">
                            {cartCount}
                        </span>
                    </button>
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
