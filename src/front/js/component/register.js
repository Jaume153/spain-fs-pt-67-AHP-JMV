import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"


export const Register  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
                    <span className="h4">Register here:</span>
                    <input type="text" placeholder="Name" className="form-control mb-3 mt-4" id="firstName" aria-describedby="nameHelp" onChange={(e)=> {setFirstname(e.target.value)}}/>
                    <input type="text" placeholder="Last Name"className="form-control mb-3" id="lastName" aria-describedby="nameHelp" onChange={(e)=> {setLastname(e.target.value)}}/>
                    <input type="email" placeholder="Email"className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setEmail(e.target.value)}}/>
                    <input type="password" placeholder="Password"className="form-control mb-3" id="exampleInputPassword1" onChange={(e)=> {setPassword(e.target.value)}}/>
                <button type="submit" className="btn btn-beige">Submit</button>
            </div>
        </form>
    )
}