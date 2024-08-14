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

			pizzaTypes: {  
                classic: [],
                deluxe: []
            },

			cart: [],
			orderId: null
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

					console.log("Datos de la API:", data);
					console.log(data.data[0].pizza_type);

					const classicPizzas = data.data.filter(pizza => pizza.pizza_type === "Classic");
                    const deluxePizzas = data.data.filter(pizza => pizza.pizza_type === "Deluxe");

					console.log("Classic Pizzas:", classicPizzas);  
        			console.log("Deluxe Pizzas:", deluxePizzas);

                    setStore({                        
                        pizzaTypes: {
                            classic: classicPizzas,
                            deluxe: deluxePizzas
                        }
                    });

					//setStore({ pizzas: data.data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			loadCart: async () => {
                try {
                    const store = getStore();
                    if (!store.orderId) {                       
                        const resp = await fetch(`${process.env.BACKEND_URL}/api/orders`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const data = await resp.json();
                        
                        const pendingOrder = data.data.find(order => order.status === "pending");
                        if (pendingOrder) {                            
                            const orderResp = await fetch(`${process.env.BACKEND_URL}/api/orders/${pendingOrder.id}`);
                            const orderData = await orderResp.json();

                            setStore({ orderId: pendingOrder.id, cart: orderData.data.items });
                        }
                    }
                } catch (error) {
                    console.log("Error loading cart:", error);
                }
            },

			addToCart: async (pizza) => {
				try {
					const store = getStore();
					let orderId = store.orderId;
			
					if (!orderId) {                       
						const resp = await fetch(`${process.env.BACKEND_URL}/api/orders`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								status: "pending",                                
							})
						});
						const orderData = await resp.json();
						orderId = orderData.order.id;
						setStore({ orderId: orderId });  
					}                    
				   
					const itemResp = await fetch(`${process.env.BACKEND_URL}/api/orderitems`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							order_id: orderId,  
							pizza_id: pizza.id
						})
					});
					const newItemData = await itemResp.json();
					setStore({ cart: [...store.cart, newItemData.order_item] });
					
					return newItemData;
				} catch (error) {
					console.log("Error adding to cart:", error);
				}
			},

			removeFromCart: async (orderItemId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/orderitems/${orderItemId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (resp.ok) {
                        const store = getStore();
                        const updatedCart = store.cart.filter(item => item.id !== orderItemId);
                        setStore({ cart: updatedCart });
                    }
                } catch (error) {
                    console.log("Error removing item from cart:", error);
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

			// orders: async() => {
			// 	try {
			// 		let response = await fetch (`${process.env.BACKEND_URL}api/orders`)
			// 		const data = await response.json()
			// 		return "ASDASD"
			// 	} catch (error) {
			// 		return false
			// 	}
			// },

			createOrder: async (user_id, id) => {
				try{
					let response = await fetch(`${process.env.BACKEND_URL}api/orders`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							"id": id,
							"user_id" : user_id,
							"payment_method" : "cash",
							"status" : "pending"
						})
					})

					const data = await response.json()
					if (!data.msg){
						return data
					} else {
						return data.msg
					}

				} catch(error) {
					return false
				}
			},

			requestResetPassword: async(email)=> {
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

			resetPassword: async(password, repeatPassword, token)=> {
				if (password != repeatPassword) {
					alert ("not the same")
					return
				}
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/resetPassword`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json",
							'Authorization': 'Bearer ' + token 
						},
						body: JSON.stringify({
							"password" : password
						})
					})
					const data = await response.json()
					if (data){
						alert(data.msg)
						return data.msg
					}
					alert("BB")

				} catch(error) {
					alert ("CC")
					return false
				}
			},

			upload_pizza: async(pizzaName, description, price, photo, pizzaType) => {
				const formData = new FormData()
				formData.append('file', photo)
				formData.append('name', pizzaName)
				formData.append('price', price)
				formData.append('description', description)
				formData.append('pizza_type', pizzaType)
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/pizzas`, {
						method: "POST",
						headers: {
							'Authorization': 'Bearer ' + token 
						},
						body: formData
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
