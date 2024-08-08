import React, { useContext,useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const {store, actions} = useContext(Context)

	useEffect(() => {
		actions.getPizzas()
	}, []);

	console.log(store.pizzas);
	

	return (
		<div className="text-center mt-5">
			{store.pizzas?.map((item) => {
				return (
					<div >
						<div>{item.name} {item.description}</div>
						<img src={item.url}></img>
					</div>
				)
			})}
		</div>
	);
};
