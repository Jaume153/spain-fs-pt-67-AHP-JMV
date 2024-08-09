import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"


export const SignUpForm  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    
    const handleLogin = async(e) => {
        e.preventDefault()
        const signIn = await actions.signIn(email, password, username)
        if (signIn) {
            navigate("/people")
        }
    }
    
    return (
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Username</label>
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" onChange={(e)=> {setUsername(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setEmail(e.target.value)}}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=> {setPassword(e.target.value)}}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Sign Up!</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}