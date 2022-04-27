/*
Register.js 
Collect user's name, email and password to register
Then send verified user information to the database
*/
import {useState} from 'react'

const Register=()=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = (e)=>{
        //
    }
    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Registser</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-4 p-4"  onchange={(e)=>{}} placeholder=""/>
                </form>
            </div>
        </>
    )
}

export default Register;