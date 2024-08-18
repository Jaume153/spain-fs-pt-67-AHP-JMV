import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'



export const Navbar = () => {

    
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const cartCount = store.cart.reduce(function(prev, cur) {
        return prev + cur.quantity;
      }, 0);
    const handleLogOut = (e) => {
        e.preventDefault()
        actions.logOut()
        navigate("/login")
    }
	return (
        <nav className="navbar navbar-light bg-light d-flex align-items-center p-0">
            <div className="container ">
                <Link to="/home">
                    <img className="logo" src='https://res.cloudinary.com/didd1mjsp/image/upload/v1723974233/Untitled-3_gwi725.png' alt="Logo" />
                </Link>
                <div className="ml-auto d-flex align-items-center">
                    {localStorage.getItem("user_name") &&
                    <div>Welcome {localStorage.getItem("user_name")}</div>}
                    {!localStorage.getItem("user_name") ?
                        <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                        </Link>: 
                        <div>
                            <button className="btn btn-outline-dark me-3 position-relative" onClick={() => navigate("/cart")}>
                                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                <span className="cart-count badge bg-secondary position-absolute top-0 start-100 translate-middle">
                                    {cartCount}
                                </span>
                            </button>
                            <button className="btn btn-primary" onClick={handleLogOut}>LogOut</button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};
