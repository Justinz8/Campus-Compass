import { useState } from "react"
import { useNavigate } from "react-router";

function Register(){
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

    function RegisterSubmit(e){
        e.preventDefault()
        fetch("http://localhost:3000/SignUpInit",
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userCreds)
            }
        )
        .then((res) => res.json())
        .then((val) => {
            console.log(val)
            if(val.success===true){
                navigate("/login")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return <div>
        <h3>Register</h3>
        <form onSubmit={RegisterSubmit}>
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

export default Register