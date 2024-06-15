import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [data,setData]=useState({email:"",password:""});
    const [error,setError]=useState("")
    const navigate=useNavigate()

    const handleChange=({currentTarget: input})=>{
        setData({...data,[input.name]:input.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const url="http://localhost:5000/api/auth"
            const {data:res}=await axios.post(url,data)
            localStorage.setItem("token",res.data)
            navigate('/weather')
            console.log(res.message)
        }
        catch(err){
            if(err.res && err.res.status>=400 && err.res.status<=500){
                setError(err.res.data.message)
            }
        }
    }
    return(
        <div>
          <div className='border-2 border-black h-180 rounded-xl '>
            <h1 className='font-bold text-3xl p-4'>Welcome back to Weatherry</h1>
            <div className='flex flex-col'>
                <form>
                    <h1 className='font-bold text-2xl p-4'>Login to your account</h1>
                    <div className='flex flex-col items-center'>
                        <input type='text' placeholder='Email-id' onChange={handleChange} name='email' value={data.email} className='border-2 border-black rounded-xl p-4 m-2 w-9/12' required/>
                        <input type='password' placeholder='Password' onChange={handleChange} name='password' value={data.password} className='border-2 border-black rounded-xl p-4 m-2 w-9/12' required/>
                        {error && <div>{error}</div>}
                        <button type='submit' onClick={handleSubmit} className='border-2 border-black rounded-xl p-4 m-2'>Login</button>
                    </div>
                </form>
            </div>
            <div className='flex flex-row justify-evenly p-5'>
                <p>New to Weatherry?</p>
                <Link to='/signup'>
                <button type='button'>
                    Register
                </button>
                </Link>
            </div>
          </div>
        </div>
    )
}

export default Login