import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const SearchResults = () => {
	const { store } = useContext(Context);
	const { searchTerm } = useParams();  

	
	const filteredPizzas = store.pizzas.filter(pizza =>
		pizza.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mt-5">
			<h2>Resultados "{searchTerm}"</h2>
			<div className="row">
				{filteredPizzas.length > 0 ? (
					filteredPizzas.map((pizza, index) => (
						<div key={index} className="col-md-4">
							<div className="card mb-4">
								<img
									src={pizza.url}
									className="card-img-top"
									alt={pizza.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{pizza.name}</h5>
									<p className="card-text">{pizza.description}</p>
								</div>
							</div>
						</div>
					))
				) : (
					<p>Lo sentimos en estos momentos no hay Pizzalicious con tus ingredientes</p>
				)}
			</div>
		</div>
	);
};