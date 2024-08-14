import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		actions.getPizzas();
	}, []);


	const handleSearch = () => {
		navigate(`/search/${searchTerm}`);
	};

	const handleAddToCart = (pizza) => {
		actions.addToCart(pizza)
		.then((result) => {
			console.log("Pizza añadida:", result);
			navigate("/cart");
		})
		.catch((error) => {
			console.log("Error al añadir la pizza:", error);
		});
	};

	// const handleAddToCart = (pizza) => {
	// 	actions.addToCart(pizza);
	// 	navigate("/cart");
	// };

	const pizzasPerSlide = 4;

	const groupedClassicPizzas = [];
    for (let i = 0; i < store.pizzaTypes.classic.length; i += pizzasPerSlide) {
        groupedClassicPizzas.push(store.pizzaTypes.classic.slice(i, i + pizzasPerSlide));
    }

	console.log("Grouped Classic Pizzas:", groupedClassicPizzas);

	const groupedDeluxePizzas = [];
    for (let i = 0; i < store.pizzaTypes.deluxe.length; i += pizzasPerSlide) {
        groupedDeluxePizzas.push(store.pizzaTypes.deluxe.slice(i, i + pizzasPerSlide));
    }

	console.log("Grouped Deluxe Pizzas:", groupedDeluxePizzas);
	
	// const groupedPizzas = [];
	// for (let i = 0; i < store.pizzas.length; i += pizzasPerSlide) {
	// 	groupedPizzas.push(store.pizzas.slice(i, i + pizzasPerSlide));
	// }

	return (
        <div className="text-center mt-5">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-start align-items-center">
                        <input
                            type="text"
                            className="form-control w-25"
                            placeholder="Search by ingredients"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary ms-2" onClick={handleSearch}>Go</button>
                        <button className="btn btn-outline-dark ms-2" onClick={() => navigate("/cart")}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                    </div>
                </div>

                <section className="cabecera-carrusel1">
                    <img src="https://www.dominospizza.es/images/02_Tier-Menu-CLAZZICAS-2022.png" alt="Clazzicas" className="header-img" />
                </section>

                <div id="pizzaCarousel1" className="carousel slide mb-5">
                    <div className="carousel-inner">
                        {groupedClassicPizzas.map((group, groupIndex) => (
                            <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}>
                                <div className="row justify-content-center">
                                    {group.map((pizza, index) => (
                                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                            <div className="pizza-item text-center">
                                                <img src={pizza.url} alt={pizza.name} className="img-fluid pizza-img" />
                                                <div className="pizza-info">
                                                    <h5>{pizza.name}</h5>
                                                    <p>{pizza.description}</p>
                                                </div>
                                                <button className="btn btn-success mt-2" onClick={() => handleAddToCart(pizza)}>Add to cart</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#pizzaCarousel1">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#pizzaCarousel1">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <section className="cabecera-carrusel2">
                    <img src="https://www.dominospizza.es/images/02_Tier-Menu-DELUXES-2022.png" alt="Deluxes" className="header-img" />
                </section>

                <div id="pizzaCarousel2" className="carousel slide">
                    <div className="carousel-inner">
                        {groupedDeluxePizzas.map((group, groupIndex) => (
                            <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}>
                                <div className="row justify-content-center">
                                    {group.map((pizza, index) => (
                                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                            <div className="pizza-item text-center">
                                                <img src={pizza.url} alt={pizza.name} className="img-fluid pizza-img" />
                                                <div className="pizza-info">
                                                    <h5>{pizza.name}</h5>
                                                    <p>{pizza.description}</p>
                                                </div>
                                                <button className="btn btn-success mt-2" onClick={() => handleAddToCart(pizza)}>Add to cart</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#pizzaCarousel2">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#pizzaCarousel2">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};