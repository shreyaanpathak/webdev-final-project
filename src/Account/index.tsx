import { Navigate, Route, Routes } from "react-router-dom"
import Signin from "./Signin"
export default function Account(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<Navigate to={"/Account/Signin"}/>}/>
                <Route path="/Signin" element={<Signin />} />
            </Routes>
        </div>
    )
}