import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"


export const LoginForm  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleLogin = async(e) => {
        e.preventDefault()
        const login = await actions.login(email, password)
        if (login === true) {
            navigate("/home")
        } else {
            alert (login)
        }
    }
    return (
        <form onSubmit={handleLogin} className="container justify-content-center d-flex h-100 align-items-center">
            <div className="login p-4 mt-5">
                <div className="mb-3 ">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=> {setPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-beige">Submit</button>
                <div className="newCustomer">
                    Are you new here?
                </div>
            </div>
        </form>
    )
}