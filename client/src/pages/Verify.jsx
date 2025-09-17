import { getData } from '@/context/userContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const Verify = () => {

    const {token} = useParams();
    const [status, setStatus] = useState("Verifying...")
    const navigate = useNavigate();
    const {backendUrl} = getData();

    const verifyEmail = async()=>{
        try {
            console.log(backendUrl);
            const res = await axios.post(`${backendUrl}user/verify`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if(res.data.success){
                setStatus("✅ Email Verified Successfully")
                toast.success(res?.data?.message);
                setTimeout(()=>{
                    navigate("/login")
                },2*1000)
            }
            else{
                setStatus("❌ Invalid or Expired Token")
            }


        } catch (error) {
            console.log(error);
            setStatus("❌ Verification Failed. Please try again")
        }
    }

    useEffect(()=>{
        verifyEmail();
    },[token, navigate])


  return (
    <div className='relative w-full h-[760px] bg-green-100 overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>
                <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
            </div>
        </div>
    </div>
  )
}

export default Verify