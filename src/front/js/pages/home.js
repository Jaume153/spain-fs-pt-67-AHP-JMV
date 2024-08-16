import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);   
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await Promise.all([actions.getPizzas(), actions.getOrder(localStorage.getItem("token"))])
            await actions.loadCart(localStorage.getItem("token"));

        }
        fetchData()
    }, []);



    const handleAddToCart = (pizza) => {
        actions.addToCart(pizza.id, localStorage.getItem("token"))
    };


    const ingredients = ["Aceitunas", "Champiñones", "Pepperoni", "Pollo", "Pulled Pork"];


    const pizzasPerSlide = 4;

    const groupedClassicPizzas = [];
    for (let i = 0; i < store.pizzaTypes.classic.length; i += pizzasPerSlide) {
        groupedClassicPizzas.push(store.pizzaTypes.classic.slice(i, i + pizzasPerSlide));
    }

    const groupedDeluxePizzas = [];
    for (let i = 0; i < store.pizzaTypes.deluxe.length; i += pizzasPerSlide) {
        groupedDeluxePizzas.push(store.pizzaTypes.deluxe.slice(i, i + pizzasPerSlide));
    }


    return (
        <div className="mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mb-3">
                        <div className="ingredient-card">
                            <h5>Filtrar por Ingredientes</h5>
                            {ingredients.map((ingredient, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={ingredient}
                                        id={`ingredient-${index}`}
                                    />
                                    <label className="form-check-label" htmlFor={`ingredient-${index}`}>
                                        {ingredient}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <section className="cabecera-carrusel1 text-center mb-4">
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
                            <button className="carousel-control-prev" type="button" data-bs-target="#pizzaCarousel1" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#pizzaCarousel1" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <section className="cabecera-carrusel2 text-center mb-4">
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
            </div>
        </div>
    );
};