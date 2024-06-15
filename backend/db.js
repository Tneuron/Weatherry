const mongoose=require('mongoose')
const mongoUrl=process.env.MONGOURL

module.exports=async ()=>{
    try{
        await mongoose.connect(mongoUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to database successfully")
    }
    catch(err){
        console.log(err)
    }
}