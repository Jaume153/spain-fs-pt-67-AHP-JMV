import React, {useContext, useState} from "react"
import { Context } from "../store/appContext"
import { useNavigate, useSearchParams } from "react-router-dom"

export const ResetPassword  = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const {actions} = useContext(Context)
    const [newPassword, setNewPassword] = useState("")
    const [repeatNewPassword, setRepeatNewPassword] = useState("")
    const navigate = useNavigate();

    const handleClick = async(e) => {
        e.preventDefault()
        const correctPassword = await actions.resetPassword(newPassword, repeatNewPassword, searchParams.get('token'))
        if (correctPassword == true) {
            navigate("/login")
        }

    }
    return (
        <form className="container justify-content-center d-flex h-100 align-items-center">
            <div className="login p-4 mt-5">
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">New password</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setNewPassword(e.target.value)}}/>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1" className="form-label">Repeat password</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> {setRepeatNewPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-beige" onClick={handleClick}>Reset password</button>
            </div>
        </form>
    )
}