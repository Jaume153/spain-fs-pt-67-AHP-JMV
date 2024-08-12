import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const NewPizza  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [photo, setPhoto] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")

    const handleLogin = async(e) => {
        e.preventDefault()
        const registered = await actions.register(firstname, lastname, email, password)
        if (registered == true){
            navigate("/home")
        }
    }
    
    return (
        <form onSubmit={handleLogin} className="container justify-content-center d-flex h-100 align-items-center">
            <div className="login p-4 mt-5">
                <div className="mb-3">
                    <input type="file" name='file' onChange={(e)=>{setPhoto(e.target.value)}}></input>
                </div>
            </div>
        </form>
    )
}