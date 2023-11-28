import React, { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import config from "../utils/config"







function Login(){

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    // localStorage.clear()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const login = await axios.post(`${config.SERVER_URL}/auth/login`, data)
            if(login.status === 200){
                console.log('Received access TOken')
                const navigatingInsta = await axios.get(`${config.SERVER_URL}/profile/instagram`,
                 {headers: {Authorization: `Bearer ${login.data.accessToken}`}}
                 )
                if(navigatingInsta.status === 200){
                    const value = login.data.accessToken
                    const userData = navigatingInsta.data.user._id
                    localStorage.setItem("userId", userData)
                    console.log(userData)
                    console.log('Navigating to Instagram')
                    localStorage.setItem("value", value)
                    navigate('/instagram')
                }
            }
        }catch(err){
            console.log(err)
        }
    }

   


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}                
                />
                <input type="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
           
        </div>
    )
}

export default Login