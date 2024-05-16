import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { signin } from "../state/user"

const Sign = () => {
    const dispatch = useDispatch()

    const [exists, setExists] = useState(false)
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        
        var formBody = [];
        var payload = {
            "email": email,
            "password": password,
            "name": 'working'
        }

        for (var property in payload) {
            var key = encodeURIComponent(property)
            var val = encodeURIComponent(payload[property])
            formBody.push(`${key}=${val}`)
        }

        formBody = formBody.join("&");

        fetch('http://localhost:3000/auth/', {
            method: 'POST',
            mode: 'cors', 
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "accept": "*/*",
                "connection": "keep-alive",
            },
            body: formBody
        })
        .then(r=>r.json())
        .then(data=>{
            if(data.name){
                payload.name = data.name;
                dispatch(signin(payload))
            }else{
                const mes = document.getElementById('incorrect')
                mes.style = "display: content"
                mes.innerText = data.msg || "Incorrect email or Password"
            }
        })
        .catch(e=>{
            console.log(e)
        })
    }
    
    const handleSingup = (e) => {
        e.preventDefault()
        console.log('signup')
    }

    const handleSwitch = (e) => {
        const signup = document.getElementById('signup')
        const login = document.getElementById('login')

        if(exists){
            signup.style = "display: none"
            login.style = "display: content"
        }else{
            login.style = "display: none"
            signup.style = "display: content"
        }
        
        setExists(!exists)
    }

    return (<>
        <div className="switch">

            <div id="login">
                <h2>Login</h2>

                <form onSubmit={e=>handleLogin(e)}>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required onChange={e=>setEmail(e.target.value)} />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw"  onChange={e=>setPassword(e.target.value)} />

                    <button type="submit">Login</button>
                </form>
                <span className="red"><p id="incorrect" style={{display: "none"}}>Incorrect email or password</p></span>
            </div>

            <div id="signup"  style={{"display": "none"}}>
                <h2>Signup</h2>

                <form onSubmit={e => handleSingup(e)}>
                    <label htmlFor="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="name" required onChange={e=>setNewName(e.target.value)} />

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required onChange={e=>setNewEmail(e.target.value)}/>

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={e=>setNewPassword(e.target.value)} />

                    <button type="submit">Signup</button>
                </form>

            </div>
            <button onClick={()=>handleSwitch()}>{exists?'existing user':'new user'}</button>
        </div>
    </>)
}

export default Sign