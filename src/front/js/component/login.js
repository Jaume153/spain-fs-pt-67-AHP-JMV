import React, {useContext, useEffect, useState} from "react"
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom"


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
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        }
    }
    return (
        <form onSubmit={handleLogin} className="container justify-content-center d-flex h-100 align-items-center">
            <div className="login p-4 mt-5 ">
                <span className="h4">Please login to your account</span>
                <div className="mb-3  mt-4">
                    <input type="email" placeholder="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <input type="password" placeholder="Password" className="form-control" id="exampleInputPassword1" onChange={(e)=> {setPassword(e.target.value)}}/>
                </div>
                <div className="text-center pt-1 mb-5 pb-1 d-flex flex-column ">
                    <button type="submit" className="btn btn-beige w-100 mb-3 mt-3">Submit</button>
                    <Link to="/requestResetPassword" relative="path" className="text-muted mt-3"> Forgot password? </Link>
                    <p id="error-message" className="error-message m-0"/>
                </div>
                <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Are you new here?</p>
                    <button  type="button" className="btn btn-outline-success" onClick={()=>{navigate("/register")}}>Create new</button>
                  </div>
            </div>
        </form>
    )
}