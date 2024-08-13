import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const NewPizza  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [photoo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [type, setType] = useState("")

    const handleLogin = async(e) => {
        const photoImput = document.getElementById("pizza_img") 
        const photo = photoImput.files[0]
        console.log(typeof(photo))
        console.log(photoImput)
        console.log(photo)

        e.preventDefault()
        const addPizza = await actions.upload_pizza(name, description, price, photo, type)
        if (addPizza == true){
            navigate("/home")
        }
    }
    
    return (
        <form onSubmit={handleLogin} className="container justify-content-center d-flex h-100 align-items-center">
            <div className="login p-4 mt-5">
                <div className="mb-3">
                    <input type="file" name='file' id="pizza_img" onChange={(e)=>{setPhoto(e.target.value)}}></input>
                    <input type="text" name='name' onChange={(e)=>{setName(e.target.value)}}></input>
                    <input type="text" name='description' onChange={(e)=>{setDescription(e.target.value)}}></input>
                    <input type="number" name='number' onChange={(e)=>{setPrice(e.target.value)}}></input>
                    <input type="text" name='type' onChange={(e)=>{setType(e.target.value)}}></input>
                    <button type="submit" className="btn btn-beige">Upload Pizza</button>
                </div>
            </div>
        </form>
    )
}