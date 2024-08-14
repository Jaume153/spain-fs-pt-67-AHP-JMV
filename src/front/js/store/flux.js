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
			order: [
				{
					user_id: "",
					orderStatus: "",
					payment_method :"",
					id: ""
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
			getMessage: async () => {
				try{
					return
				}catch(error){
					return ("Error loading message from backend", error)
				}
			},

			getPizzas: async () => {
				try{
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
					return ("Error loading message from backend", error)
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
                    return ("Error loading cart:", error);
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
					return ("Error adding to cart:", error);
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
                    return ("Error removing item from cart:", error);
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
			getOrder: async(token) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}api/orders`, {
						method: "GET",
						headers: {
							'Authorization': 'Bearer ' + token 
						},
					})
					const data = await response.json()
					let findUserOrder = data.data.filter((element)=> element.user_id == data.user_id)
					let userPendingOrders = findUserOrder.find((e) => e.status == "Pending")
					if (data.data == "" || !userPendingOrders){
						getActions().createOrder(data.user_id, token)
					} else {
						setStore({ order: userPendingOrders })
						return
					}
					return true
				} catch (error) {
					return error
				}
			},

			createOrder: async (user_id, token) => {
				try{
					let response = await fetch(`${process.env.BACKEND_URL}api/orders`, {
						method: "POST",
						headers: {
							"Content-Type" : "application/json",
							'Authorization': 'Bearer ' + token 
						},
						body: JSON.stringify({
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
						method: "PATCH",
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
					alert (error)
					return false
				}
			},

			upload_pizza: async(pizzaName, description, price, photo, pizzaType, token) => {
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
					return 
				} catch (error) {
					return false
				}
			},
		}
	};
};

export default getState;
