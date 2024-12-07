import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import Body from '../components/generalComponents/Body';
import Container from '../components/generalComponents/Container';
import RedButton from '../components/generalComponents/RedButton';
import { useDispatch, useSelector } from 'react-redux';
import authentication from '../app/services/authentication.js';
import { toast } from 'react-toastify';
import { clearState } from '../app/authSlice.js';
import { Navigate } from 'react-router-dom';

function Otp() {
    const [otp, setOtp] = useState('')
    const [send, setSend] = useState(false)
    const {usn, password, username, role} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    
    const handleResendOtp = async ()=>{
        try {
            const response = await authentication.verify({usn, username, password, role});
            toast.success(response.data.message)
          } catch (error) {
            toast.error(error.response.data.message)
          }
    }

    const handleSubmission = async ()=>{
        try {
            const response = await authentication.register({usn, username, password, otp, role});
            dispatch(clearState())
            toast.success(response.data.message)
            setSend(true)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


  return (
    <Body>
        <Container className='max-w-sm bg-gray-800 w-full border border-gray-600 border-opacity-30'>
           <div className='w-full flex justify-center mb-7 text-xl text-green-500'>
                <p style={{fontWeight:"bold"}}>OTP is sent to your Email &#x2713;</p>
           </div>

            <OtpInput
            inputStyle={{
                backgroundColor:'#2d3748',
                width:'60px',
                height:'60px',
                borderRadius : '10px',
                fontSize: '2rem',
                fontWeight: 'bold',
                userSelect: 'none'
            }}
            containerStyle={{
                display: 'flex',
                justifyContent : 'space-around',
                marginBottom : '20px'
            }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props}/>}
            />
        <div className='w-full mb-5 flex justify-end place-items-center text-lg text-cyan-500'>
            <p className='cursor-pointer hover:underline' onClick={()=>{handleResendOtp()}}>resend OTP</p>
        </div>
        <RedButton className="text-xl" type="button" onClick={()=>{handleSubmission()}}>Verify</RedButton>

        {send && <Navigate to='/login' />}
        </Container>
    </Body>
  )
}

export default Otp
