const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: "",

			pizzas: [
				{
					name: "",
					description: "",
					price: "",
					url: ""
				}
			],

			order: 
			{
				user_id: "",
				orderStatus: "",
				payment_method :"",
				id: ""
			},

			allOrders: [],

			singleOrder: [],
			
			pizzaTypes: {  
				classic: [],
                deluxe: []
            },
			
			ingredients: [],
			
			cart: []
		},
		actions: {

			register: async(firstName, lastname, email, password) => {
				
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/users/register`, {
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
						setStore({user: data.user})
						localStorage.setItem("token", data.access_token)
						localStorage.setItem("user_name", data.user.firstname);
						localStorage.setItem("user_role", data.user.role);
						return true
					} else {
						return data.msg
					}

				} catch(error) {
					return false
				}
			},

			login: async(email, password) => {
				try{
					let response = await fetch (`${process.env.BACKEND_URL}api/users/login`, {
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
						setStore({user: data.users})
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("user_name", data.users.firstname);
						localStorage.setItem("user_role", data.users.role);
						return true
					} else {
						const errorMessage = document.getElementById('error-message');
						errorMessage.style.display = 'block';
						errorMessage.textContent = data.msg;
						return data.msg
					}
	
				} catch(error) {
					return error
				}
			},

			logOut: async() => {
				localStorage.removeItem("token");
				localStorage.removeItem("user_name");
				localStorage.removeItem("user_role");
				setStore({order: ""})
				setStore({user: ""})
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
					let response = await fetch (`${process.env.BACKEND_URL}api/users/resetPassword`, {
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

				} catch(error) {
					alert (error)
					return false
				}
			},

			getUser: async(token)=> {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}api/users/user/${getStore().order.user_id}`, {
						method: "GET",
						headers: {
							'Authorization': 'Bearer ' + token 
						}
					})	
					const data = await response.json()
					console.log("Llega")
					setStore({user: data.data})
					return
				} catch (error) {
					
				}
			},
			getPizzas: async (list) => {
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}api/pizzas`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							ingredients: list
						})
					})
					const data = await resp.json()	
					const classicPizzas = data.data.filter(pizza => pizza.pizza_type === "Classic");
                    const deluxePizzas = data.data.filter(pizza => pizza.pizza_type === "Deluxe");

                    setStore({                        
                        pizzaTypes: {
                            classic: classicPizzas,
                            deluxe: deluxePizzas
                        }
                    });

					setStore( { pizzas: data.data} );

					//setStore({ pizzas: data.data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					return ("Error loading message from backend", error)
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
					let response = await fetch (`${process.env.BACKEND_URL}api/pizzas/create`, {
						method: "POST",
						headers: {
							'Authorization': 'Bearer ' + token 
						},
						body: formData
					})
					const data = await response.json()
					return true
				} catch (error) {
					return false
				}
			},

			getIngredients: async() => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/ingredients`)
					const data = await resp.json()
					setStore({ingredients: data.data})
					return
				} catch (error) {
					return ("Error loading message from backend", error)
				}
			},

			getOrder: async(token) => {
				if (!token){
					return
				}
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
						getActions().createOrder(token)
						return
					} else {
						setStore({ order: userPendingOrders })
						getActions().loadCart(token)
						return
					}
				} catch (error) {
					return error
				}
			},
			
			getAllOrders: async (token) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}api/orders`, {
						method: "GET",
						headers: {
							'Authorization': 'Bearer ' + token 
						},
					})
					const data = await response.json()
					let findUserOrder = data.data.filter((element)=> element.user_id == data.user_id)
					setStore({allOrders: findUserOrder})
					console.log(getStore().allOrders)
					return
				} catch (error) {
					
				}
			},

			getSingleOrder: async (token, id) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}api/orders/order/${id}`, {
						method: "GET",
						headers: {
							'Authorization': 'Bearer ' + token 
						},
					})
					const data = await response.json()
					setStore({singleOrder: data.data})
					console.log(getStore().singleOrder)
					return
				} catch (error) {
					
				}
			},

			createOrder: async (token) => {
				try{
					let response = await fetch(`${process.env.BACKEND_URL}api/orders/create`, {
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
					if (data.msg = "Order created"){
						setStore({ order: data.order })
						getActions().loadCart(token)
						return
					} else {
						return data.msg
					}
					
				} catch(error) {
					return false
				}
			},
			
			loadCart: async (token) => {
				
				if (!getStore().order.id) {
					setStore({cart: [] })
					return console.log("Not logged in")
				}
                try {                      
					const resp = await fetch(`${process.env.BACKEND_URL}api/orderitems/orderID/${getStore().order.id}`, {
						method: "GET",
						headers: {
							'Authorization': 'Bearer ' + token 
						}
					});
					const data = await resp.json();
					setStore({cart: data.data });
                } catch (error) {
                    return console.log("Error loading cart:", error);
                }
            },

			addToCart: async (pizza_id, token) => {
				try {
					let orderId = getStore().order.id;
					
					if (!orderId) {                       
						getActions().createOrder(token)
					}         

					const itemResp = await fetch(`${process.env.BACKEND_URL}api/orderitems/create`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token 
						},
						body: JSON.stringify({
							order_id: getStore().order.id,  
							pizza_id: pizza_id
						})
					});
					getActions().loadCart(token)
					
					return newItemData;
				} catch (error) {
					return ("Error adding to cart:", error);
				}
			},

			removeFromCart: async (pizza_id, token) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/orderitems/delete`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
							'Authorization': 'Bearer ' + token 
                        },
						body: JSON.stringify({
							order_id: getStore().order.id,  
							pizza_id: pizza_id
						})
                    });
                    if (resp.ok) {
                        const updatedCart = getStore().cart.filter(item => item.id !== orderItemId);
                        setStore({ cart: updatedCart });
						return true
                    }
                } catch (error) {
                    return ("Error removing item from cart:", error);
                }
            },

			checkout: async(token) => {
				
				try {
					let response = await fetch (`${process.env.BACKEND_URL}api/orders/checkout/${getStore().order.id}`, {
						method: "PATCH",
						headers: {
							"Content-Type" : "application/json",
							'Authorization': 'Bearer ' + token 
						},
						body: JSON.stringify({
							"status" : "completed"
						})
					})
					
					const data = await response.json()
					if (data){
						alert(data.msg)
						setStore({cart: []})
						return data.msg
					}
				} catch (error) {
					return console.log(error)
				}
			},

			getMessage: async () => {
				try{
					return
				}catch(error){
					return ("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
