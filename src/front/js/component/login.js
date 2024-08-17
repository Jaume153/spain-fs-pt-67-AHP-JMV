import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"


export const LoginForm  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        async function fetchData() {
            await actions.loadCart("nothing");
        }
        fetchData()
    }, []);

    
    const handleLogin = async(e) => {
        e.preventDefault()
        const login = await actions.login(email, password)
        if (login === true) {
            navigate("/home")
            actions.getOrder(localStorage.getItem("token"))
        } else {
            alert (login)
        }
    }
    return (
        <form onSubmit={handleLogin} className="container justify-content-center d-flex h-100 align-items-center">
            <div className="login p-4 mt-5">
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=> {setPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-beige">Submit</button>
                <div>
                    <div className="newCustomer">
                        Are you new here?
                    </div>
                    <button className="btn btn-primary" onClick={()=>{navigate("/register")}}>
                        Register here
                    </button>
                </div>
                <div>
                    <div className="newCustomer">
                        Forgot your password? 
                    </div>
                    <button className="btn btn-danger" onClick={()=>{navigate("/requestResetPassword")}}>Click here!</button>
                </div>
            </div>
        </form>
    )
}