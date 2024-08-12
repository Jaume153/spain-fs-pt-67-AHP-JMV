const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			pizzas: [
				{
					name: "",
					description: "",
					price: "",
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
					const resp = await fetch(`${process.env.BACKEND_URL}api/pizzas`)
					const data = await resp.json()
					setStore({ pizzas: data.data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async(email, password) => {
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/login`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"email" : email,
							"password" : password
						})
					})
					const data = await response.json()
					console.log(data.msg)
					if (!data.msg){
						localStorage.setItem("token", data.access_token);
						return true
					} else {
						return data.msg
					}

				} catch(error) {
					return error
				}
			},

			register: async(firstName, lastname, email, password) => {
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/register`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"firstname" : firstName,
							"lastname" : lastname,
							"email" : email,
							"password" : password,
							"role": "customer"
						})
					})

					const data = await response.json()
					if (!data.msg){
						localStorage.setItem("token", data.access_token)
						return true
					} else {
						return data.msg
					}

				} catch(error) {
					return false
				}
			},

			logOut: async() => {
				localStorage.removeItem("token");
			},
			resetPassword: async(email)=> {
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/requestResetPassword`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"email" : email
						})
					})
					const data = await response.json()
					if (data){
						alert(data)
						return data
					}
					alert(data)

				} catch(error) {
					return false
				}
			},
			upload_pizza: async(pizzaName, description, price, photo, pizzaType) => {
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/pizzas`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"name" : pizzaName,
							"url" : photo,
							"price" : price,
							"description" : description,
							"pizza_type" : pizzaType
						})
					})
					const data = await response.json()
				} catch {

				}
			},
			upload_pizza_photo: async(file) => {
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/pizzas`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"file" : file
						})
					})
				} catch {

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
