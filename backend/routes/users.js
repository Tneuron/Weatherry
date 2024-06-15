const router=require('express').Router();
const {User,validate}=require('../models/user')
const bcrypt=require('bcrypt')
const safe_salt=process.env.SALT

router.post('/',async (req,res)=>{
    try{
        const {error}=validate(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({ message: "User with given email already exists" });
        }

        const salt=await bcrypt.genSalt(Number(safe_salt))
        const hashPassword= await bcrypt.hash(req.body.password, salt);

        const newUser=await new User({...req.body,password:hashPassword})
        await newUser.save()
        
        res.status(201).send({message: "New User created!!!"})
    }
    catch(err){
        console.error("Error creating user:", err);
        res.status(500).send({message: "Internal server error!!!"})
    }
})

module.exports=router