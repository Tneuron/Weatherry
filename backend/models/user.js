const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const joi=require('joi')
const passwordComplexity=require('joi-password-complexity')

const userSchema=new mongoose.Schema(
    {
        userName:{type:String,required:true,unique:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    }
)

userSchema.methods.generateAuthToken =function(){
    const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"30d"});
    return token;
}

const User=mongoose.model("user",userSchema)

const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const customMessages = {
    "passwordComplexity.tooShort": "Password should be at least 8 characters long.",
    "passwordComplexity.tooLong": "Password should not exceed 30 characters.",
    "passwordComplexity.lowerCase": "Password should contain at least one lowercase letter.",
    "passwordComplexity.upperCase": "Password should contain at least one uppercase letter.",
    "passwordComplexity.numeric": "Password should contain at least one numeric character.",
    "passwordComplexity.symbol": "Password should contain at least one special character.",
    "passwordComplexity.requirementCount": "Password should meet at least four of the complexity requirements."
};


const validate=(data)=>{
    const schema=joi.object({
        userName:joi.string().required().label("UserName"),
        email:joi.string().email().required().label("Email-id"),
        password: passwordComplexity(complexityOptions).messages(customMessages)
    })
    return schema.validate(data)
}

module.exports={User,validate}