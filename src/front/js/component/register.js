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
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">FirstName</label>
                    <input type="text" className="form-control" id="firstName" aria-describedby="nameHelp" onChange={(e)=> {setFirstname(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Lastname</label>
                    <input type="text" className="form-control" id="lastName" aria-describedby="nameHelp" onChange={(e)=> {setLastname(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=> {setPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}