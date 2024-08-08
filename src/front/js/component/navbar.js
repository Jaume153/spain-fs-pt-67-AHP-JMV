import React from "react";
import { Link } from "react-router-dom";



export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img className="logo" src='https://res.cloudinary.com/didd1mjsp/image/upload/v1723140966/Untitled-2_n4lggj.png'/>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
