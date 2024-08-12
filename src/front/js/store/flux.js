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
			],

			cart: []
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

			addToCart: async (pizza) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/orderitems`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"email" : email,
							"password" : password
						})
					})					
					const data = await resp.json()
					setStore({ pizzas: data.data })
					
					return data;
					
				}catch(error){

				}
                const store = getStore();
                setStore({ cart: [...store.cart, pizza] });
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

			signIn: async(email, password, username) => {
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/register`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"email" : email,
							"password" : password,
							"role": "Customer",
							"username" : username
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
				console.log("segundo")
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
					console.log("tercero")
					const data = await response.json()
					if (data){
						alert(data)
						return data
					}
					alert(data)

				} catch(error) {
					console.log("cuarto")
					return false
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
