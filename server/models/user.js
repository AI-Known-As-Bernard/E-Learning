import mongoose from 'mongoose';
const {Schema} = mongoose;


const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type:String,
        default:"/avatar.png"
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min:6,
        max:64
    },
    role:{
        type: [String],
        default:["Subscriber"],
        enum: ["Subscriber","Instructor","Admin"]
    },
    stripeAccountId:'',
    stripeSeller:{},
    stripeSession:{},
},{timestamps:true}
)

export default mongoose.model("User",userSchema)