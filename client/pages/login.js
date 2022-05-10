/*
Register.js 
Collect user's name, email and password to register
Then send verified user information to the database
*/
import {useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FaSync} from "react-icons/fa"
import {Puff} from 'react-loading-icons'
import { Spin } from 'antd'
import {Context} from '../context/index'
import {useRouter} from 'next/router'
import Link from 'next/link'

const Login=()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [loading,setLoading] = useState(false)


    //useContext Provider State:
    //use can also destructure user on the call for the state and dispatcher 
    //ex:  const {state:{user},dispatch}= useContext(Context)
    const {state,dispatch} = useContext(Context)
    const {user} = state
    console.log("STATE: " + state.user)

    //Router
    const router = useRouter()
    const checkValid = ()=>{
        const password = document.querySelector('input[name="password"]')
        const confirmPassword = document.querySelector('input[name="confirmPassword"]')
        if(password.value ===confirmPassword.value){
           confirmPassword.setCustomValidity('')
        }else{confirmPassword.setCustomValidity('Passwords Do Not Match')}
    }

    //Re-Routing logged in user away from login.
    useEffect(()=>{
        if(user !== null){router.push('/')}
    },[user])
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true)
            console.table({email,password})
            const {data} = await axios.post(`/api/login`,{email,password})
            /* 
            //console.log('LOGIN RESPONSE: ' + data)
            Sending ACTION with user data to Provider, where the reducer will use the
            switch statement to determine what infomation is returned with the state*/
            dispatch({
                type:"LOGIN",
                payload:data,
            })
            //Save in local storage
            window.localStorage.setItem('user',JSON.stringify(data))
            // toast.success('Login Successful')
            
            //Redirect After Successfull Login
            router.push('/')
            
            
            // setLoading(false)
        }catch(err){
            toast.error(err.response.data)
            setLoading(false)
        }
    }
    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Login</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        className="form-control mb-4 p-4 emailInput" 
                        // value={email}  
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        placeholder="Enter Email" 
                        required
                    />
                    <input 
                        type="password" 
                        className="form-control mb-4 p-4 passwordInput" 
                        name="password" 
                        // value={password}  
                        onChange={(e)=>{setPassword(e.target.value)}} 
                        placeholder="Enter Password" 
                        required
                    />
                    <br/>

                    <button type='submit' className="btn btn-block btn-primary maxWidth " disabled={ !email ||!password || loading}>
                        {loading ? <Puff stroke="blue" speed={0.8}/>: "Submit"}
                    </button>
                </form>
                <p className="text-center p-3">
                    New to the platform? 
                    <Link href="/register"> Register</Link>
                    </p>
            </div>
        </>
    )
}

export default Login;