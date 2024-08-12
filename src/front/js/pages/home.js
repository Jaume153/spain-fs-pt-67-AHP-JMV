import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();  

	useEffect(() => {
		actions.getPizzas();
	}, [actions]);

	
	const handleSearch = () => {
		navigate(`/search/${searchTerm}`);
	};

	const pizzasPerSlide = 4;
	const groupedPizzas = [];
	for (let i = 0; i < store.pizzas.length; i += pizzasPerSlide) {
		groupedPizzas.push(store.pizzas.slice(i, i + pizzasPerSlide));
	}

	return (
		<div className="text-center mt-5">
			<div className="container">
				<div className="row mb-3">
					<div className="col-12 d-flex justify-content-start">
						<input
							type="text"
							className="form-control w-25"
							placeholder="Buscar por ingredientes"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button className="btn btn-primary ms-2" onClick={handleSearch}>Buscar</button>
					</div>
				</div>

				
				<section className="cabecera-carrusel">
					<img src="https://www.dominospizza.es/images/02_Tier-Menu-CLAZZICAS-2022.png" alt="Clazzicas" />
				</section>

				<div id="pizzaCarousel1" className="carousel slide mb-5">
					<div className="carousel-inner">
						{groupedPizzas.map((group, groupIndex) => (
							<div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}>
								<div className="d-flex justify-content-center">
									{group.map((pizza, index) => (
										<div key={index} className="pizza-item mx-2">
											<img
												src={pizza.url}
												alt={pizza.name}
												className="img-fluid"
											/>
											<h5>{pizza.name}</h5>
											<p>{pizza.description}</p>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#pizzaCarousel1" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#pizzaCarousel1" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>

				
				<section className="cabecera-carrusel">
					<img src="https://www.dominospizza.es/images/02_Tier-Menu-DELUXES-2022.png" alt="Clazzicas" />
				</section>

				<div id="pizzaCarousel2" className="carousel slide">
					<div className="carousel-inner">
						{groupedPizzas.map((group, groupIndex) => (
							<div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}>
								<div className="d-flex justify-content-center">
									{group.map((pizza, index) => (
										<div key={index} className="pizza-item mx-2">
											<img
												src={pizza.url}
												alt={pizza.name}
												className="img-fluid"
											/>
											<h5>{pizza.name}</h5>
											<p>{pizza.description}</p>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#pizzaCarousel2" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#pizzaCarousel2" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		</div>
	);
};
