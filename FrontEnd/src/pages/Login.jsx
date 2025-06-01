import { useState } from "react"
import { useNavigate } from "react-router";
import { auth } from "../helper/firebase"
import {
  signInWithEmailAndPassword
} from "firebase/auth";

function Login(){
    const navigate = useNavigate()
    const [userCreds, setUserCreds] = useState({
        email:"",
        password: ""
    })

    function handleCredentialChange(e) {
    setUserCreds((x) => {
        return { ...x, [e.target.name]: e.target.value };
        });
    }

    function LoginSubmit(e){
        e.preventDefault()
        signInWithEmailAndPassword(auth, userCreds.email, userCreds.password).then(()=>{
            navigate("/")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return <div>
        <h3>Login</h3>
        <form onSubmit={LoginSubmit}>
            <input type="text" 
                name="email" 
                onChange={handleCredentialChange}
                value={userCreds.email}
                placeholder="Email"/>
            <input type="password" 
                name="password" 
                onChange={handleCredentialChange}
                value={userCreds.password}
                placeholder="Password"/>
            <button type="Submit">Submit</button>
        </form>
    </div>
}

export default Login