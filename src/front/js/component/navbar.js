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
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                    <i class="fa-solid fa-bars"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><Link to="/home" class="dropdown-item" href="#">Profile</Link></li>
                                    <li><Link to="/home" class="dropdown-item" href="#">My orders</Link></li>
                                    {isAdmin() == "Admin" &&
                                    <li className="dropstart">
                                        <ul class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#">Manage pizzas</ul>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/newpizza" class="dropdown-item" href="#">Add pizza</Link></li>
                                            <li><Link to="/home" class="dropdown-item" href="#">Delete pizza</Link></li>
                                        </ul>
                                    </li>
                                    }
                                    {isAdmin() == "Admin" &&
                                    <li className="dropstart">
                                        <ul to="/home" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#">Manage users</ul>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/newpizza" class="dropdown-item" href="#">View all users</Link></li>
                                            <li><Link to="/home" class="dropdown-item" href="#">Delete user</Link></li>
                                        </ul>
                                    </li>
                                    }
                                    <li><Link to="/login" onClick={handleLogOut} class="dropdown-item" href="#">LogOut</Link></li>
                                    
                                </ul>
                            </div>
                        </div>

                    }
                </div>
            </div>
        </nav>
    );
};
