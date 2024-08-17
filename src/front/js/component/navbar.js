import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'



export const Navbar = () => {

    
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const cartCount = store.cart.length;

    const handleLogOut = (e) => {
        e.preventDefault()
        actions.logOut()
        navigate("/login")
    }
	return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/home">
                    <img className="logo" src='https://res.cloudinary.com/didd1mjsp/image/upload/v1723140966/Untitled-2_n4lggj.png' alt="Logo" />
                </Link>
                <div className="ml-auto d-flex align-items-center">
                    <button className="btn btn-outline-dark me-3 position-relative" onClick={() => navigate("/cart")}>
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        <span className="cart-count badge bg-secondary position-absolute top-0 start-100 translate-middle">
                            {cartCount}
                        </span>
                    </button>
                    {localStorage.getItem("user_name") &&
                    <div>Welcome {localStorage.getItem("user_name")}</div>}
                    {!localStorage.getItem("user_name") ?
                        <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                        </Link> :
                        <button className="btn btn-primary" onClick={handleLogOut}>LogOut</button>
                    }
                    <button className="btn btn-primary" onClick={(e)=> {console.log(store.user)}}>aaaa</button>
                </div>
            </div>
        </nav>
    );
};
