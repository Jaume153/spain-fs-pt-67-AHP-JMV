import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react"
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'



export const Navbar = () => {

    
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    
    let cartCount = 0
    
    if (store.cart != ""){
        cartCount = store.cart.reduce(function(prev, cur) {
            return prev + cur.quantity;
          }, 0);
    } else {
        cartCount = 0
    }

    const isLogged = () => {
        return localStorage.getItem("user_name")
    }
    const isAdmin = () => {
        return localStorage.getItem("user_role")
    }
    const handleLogOut = (e) => {
        e.preventDefault()
        actions.logOut()
        navigate("/login")
    }
	return (
        <nav className="navbar navbar-light bg-light d-flex align-items-center p-0">
            <div className="container ">
                <Link to="/home">
                    <img className="logo" src='https://res.cloudinary.com/didd1mjsp/image/upload/v1724007672/Pizzalicious_sr3pfy.png' alt="Logo" />
                </Link>
                <div className="ml-auto d-flex align-items-center">
                    {isLogged() &&
                    <div className="me-3 login-name">Welcome {localStorage.getItem("user_name")}!</div>}
                    {!isLogged() ?
                        <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                        </Link>: 
                        <div className="d-flex">
                            <button className="btn btn-outline-dark me-3 position-relative" onClick={() => navigate("/cart")}>
                                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                <span className="cart-count badge bg-secondary position-absolute top-0 start-100 translate-middle">
                                    {cartCount}
                                </span>
                            </button>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link to="/profile" className="dropdown-item" href="#">Profile</Link></li>
                                    <li><Link to="/orders/user" className="dropdown-item" href="#">My orders</Link></li>
                                    {isAdmin() == "Admin" &&
                                    <li><Link to="/newpizza" className="dropdown-item" href="#">Manage pizzas</Link></li>
                                    }
                                    {isAdmin() == "Admin" &&
                                    <li><Link to="/users/all" className="dropdown-item" href="#">Manage users</Link></li>
                                    }
                                    <li><Link to="/login" onClick={handleLogOut} className="dropdown-item" href="#">LogOut</Link></li>
                                    
                                </ul>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </nav>
    );
};
