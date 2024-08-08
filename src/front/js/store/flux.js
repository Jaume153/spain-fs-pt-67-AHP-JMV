const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			pizzas: [
				{
					name: "FIRST",
					description: "white",
					price: "white",
					url: ""
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					console.log("ASDFADF")
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getPizzas: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch("https://upgraded-guide-9r4pgx45v5p3x4pr-3001.app.github.dev/api/pizzas")
					const data = await resp.json()
					setStore({ pizzas: data.data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
