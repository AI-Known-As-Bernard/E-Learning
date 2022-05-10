import User from '../models/user'
import { createHashedPassword,comparePassword } from '../util/authUtil'
import jwt from 'jsonwebtoken'

export const register= async(req,res) => {
    try{
        // console.log(req.body)
        const {firstName,lastName,email,password} = req.body
        //User Validation
        if(!firstName || !lastName)return res.status(400).send({message:'Name is Required'})
        if(!password||password.length < 6){
            return res.status(400).send({message:'Password is required and must be at least 6 characters'})
        }
        let userExist = await User.findOne({email}).exec()
        if(userExist)return res.status(400).send('Email is taken')
        //Hash Password 
        const hashedPassword = await createHashedPassword(password)
        //Register New User
        const user = new User({firstName,lastName,email,password:hashedPassword})
        await user.save()
        // console.log("Saved User: " + user)
        return res.json({ok: true})
    } catch(err){
        console.log(err)
        return res.status(400).send({message:'Error. Try again'})
    }
}

/***
 * For the Server:
 * To login the user we need to check if user's password is correct
 * We need to take user's password, hash it and then compare it with the 
 * hash password saved in the database
 * Then We need to generate json web token{JWT} and send it the client
 * 
 * npm i jsonwebtoken
 */

export const login = async(req, res) => {
    try{
        // console.log(req.body)
        const {email,password} = req.body
        //Check if the DB has user with that email
        const user = await User.findOne({email: email}).exec()
        if(!user) return res.status(400).send('No User Found')
        //Check the Password of the user
        const match= await comparePassword(password,user.password)
        //Create Signed JWT: We can store information in the token and once the token is validated you can access and use that data (ID)
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: '1d',})
        //Above details the token expiration next to that will detail the process trigger after any token has hit the expiration time. Do accomplish this we will be using axios interceptors(essentially axios middleware functions that occur on each request)
        
        //Return user and token to the client, excluding the hashed password
        user.password = undefined//This way the password wont be sent
        //Send token in Cookie
        res.cookie("token",token,{
            httpOnly: true,
            // secure:true, //only works on HTTPS
        })
        //Send user a json response
        res.json(user)
    } catch(err){
        return res.status(400).send({message:'Error Try Again'})
    }

    /**
     * Global States for the dashboard filled with user information
     * The are two ways to approuch this : Redux  VS useContext(hook) + {Also useReducer}
     * This is our next move 
     */
}

//LOGOUT
export const logout = async(req, res)=>{
    try{
        res.clearCookie('token')
        //removed signed JWT token
        return res.json({message:'Signout Success'})
    }catch(err){console.log(err + "THIS HERE")}
}