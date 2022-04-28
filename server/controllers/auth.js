import User from '../models/user'
import { createHashedPassword,comparePassword } from '../util/authUtil'

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
        //Register 
        const user = new User({firstName,lastName,email,password:hashedPassword})
        await user.save()
        // console.log("Saved User: " + user)
        return res.json({ok: true})
    }catch(err){
        console.log(err)
        return res.status(400).send({message:'Error. Try again'})
    }
}