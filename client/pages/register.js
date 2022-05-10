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
import Link from 'next/link'
import {Context} from '../context/index.js'
import {useRouter} from 'next/router'

const Register=()=>{
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [loading,setLoading] = useState(false)
    
    //use the Context for user information (useContext)
    const {state,dispatch} = useContext(Context)
    const {user} = state
    //Router 
    const router = useRouter()
    //Re-Routing logged in user away from login.
    useEffect(()=>{
        if(user !== null){router.push('/')}
    },[user])

    const checkValid = ()=>{
        const password = document.querySelector('input[name="password"]')
        const confirmPassword = document.querySelector('input[name="confirmPassword"]')
        if(password.value ===confirmPassword.value){
           confirmPassword.setCustomValidity('')
        }else{confirmPassword.setCustomValidity('Passwords Do Not Match')}
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true)
            console.table({firstName,lastName,email,password})
            const {data} = await axios.post(`/api/register`,{firstName,lastName,email,password})
            // console.log('REGISTER RESPONSE: ' + data)
            toast.success('Registration Completed, Please Login')
            setLoading(false)
        }catch(err){
            toast.error(err.response.data)
            setLoading(false)
        }
    }
    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Register</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="form-control mb-4 p-4 nameInput" 
                        // value={()=>name}  
                        onChange={(e)=>{setFirstName(e.target.value)}} 
                        placeholder="Fist Name" 
                        required
                    />
                    <input 
                        type="text" 
                        className="form-control mb-4 p-4 nameInput" 
                        // value={()=>name}  
                        onChange={(e)=>{setLastName(e.target.value)}} 
                        placeholder="Last Name" 
                        required
                    />
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
                    <input 
                        type="password" 
                        name='confirmPassword'
                        className="form-control mb-4 p-4 passwordInput" 
                        // value={password}  
                        onChange={(e)=>{setPassword2(e.target.value);checkValid();}} 
                        placeholder="Confirm Password" 
                        required
                    />
                    <br/>

                    <button type='submit' className="btn btn-block btn-primary maxWidth " disabled={!firstName || !lastName || !email ||!password || loading}>
                        {loading ? <Puff stroke="blue" speed={0.8}/>: "Submit"}
                    </button>
                </form>
                <p className="text-center p-3">
                    Already Registerd?
                    <Link href="/login">Login</Link>
                    </p>
            </div>
        </>
    )
}

export default Register;