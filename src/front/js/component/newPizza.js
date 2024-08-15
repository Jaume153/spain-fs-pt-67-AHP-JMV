import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const NewPizza  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [type, setType] = useState("")

   
    const handleLogin = async(e) => {
        const photoImput = document.getElementById("pizza_img") 
        const photo = photoImput.files[0]
        const token = localStorage.getItem("token")

        e.preventDefault()
        const addPizza = await actions.upload_pizza(name, description, price, photo, type, token)
        if (addPizza == true){
            navigate("/home")
        }
    }
    
    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="dashboard-title mt-5">Upload pizzas dashboard</h2>
            <form onSubmit={handleLogin} className="container justify-content-center d-flex h-100 align-items-center">
                <div className="login p-4 mt-5">
                    <div className="mb-3">
                        <input 
                            type="file" 
                            name='file' 
                            id="pizza_img" 
                            onChange={(e)=>{setPhoto(e.target.value)}} 
                        />
                        <span className="file-name">{photo}</span> 
                        <input 
                            type="text" 
                            name='name' 
                            placeholder="Name" 
                            onChange={(e)=>{setName(e.target.value)}} 
                        />
                        <input 
                            type="text" 
                            name='description' 
                            placeholder="Description" 
                            onChange={(e)=>{setDescription(e.target.value)}} 
                        />
                        <input 
                            type="text" 
                            name='price' 
                            placeholder="Price" 
                            onChange={(e)=>{setPrice(e.target.value)}} 
                        />
                        <select 
                            name='type' 
                            onChange={(e)=>{setType(e.target.value.toLowerCase())}} 
                        >
                            <option value="">Select pizza type</option>
                            <option value="classic">Classic</option>
                            <option value="deluxe">Deluxe</option>
                        </select>
                        <button type="submit" className="btn btn-beige">Upload Pizza</button>
                    </div>
                </div>
            </form>
        </div>
    )
    
}