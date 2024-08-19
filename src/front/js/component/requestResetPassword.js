import React, {useContext, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"


export const RequestResetPassword  = () => {
    
    const navigate = useNavigate()
    const {actions} = useContext(Context)
    const [email, setEmail] = useState("")
    
    const handleClick = async(e) => {
        e.preventDefault()
        actions.requestResetPassword(email)

    }
    return (
        <form className="container justify-content-center d-flex h-100 align-items-center">
            <div className="login p-4 mt-5">
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-beige" onClick={handleClick}>Send mail to reset password</button>
            </div>
        </form>
    )
}