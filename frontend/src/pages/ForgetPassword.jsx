import React, { useState } from "react";
import Body from "../components/generalComponents/Body.jsx";
import Container from "../components/generalComponents/Container.jsx";
import { useForm } from "react-hook-form";
import authentication from "../app/services/authentication.js";
import { toast } from "react-toastify";
import BlueButton from "../components/generalComponents/BlueButton";
import { Navigate } from "react-router-dom";
import { clearState, verify } from "../app/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import GreenButton from "../components/generalComponents/GreenButton.jsx";

function ForgetPassword() {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [send, setSend] = useState(false);
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('')
    const [complete, setComplete] = useState(false)

    const {usn, password} = useSelector(state => state.auth)
    
    const handleResendOtp = async ()=>{
      try {
          const response = await authentication.forgetPassword({usn});
          toast.success(response.data.message)
        } catch (error) {
          toast.error(error.response.data.message)
        }
  }

  const handleSubmission = async ()=>{
      try {
          const response = await authentication.resetPassword({usn, password, otp});
          dispatch(clearState())
          toast.success(response.data.message)
          setComplete(true)
      } catch (error) {
          toast.error(error.response.data.message)
      }
  }


    const onSubmit = async (data) => {
        data = { ...data, usn: data.usn.toUpperCase(), role: "", username: "" };
        setLoading(true);
        try {
            const response = await authentication.forgetPassword(data);
            dispatch(verify(data));
            toast.success(response.data.message);
            setSend(true);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };

    return (
        <Body>
            {send ? (
                <Container className="max-w-sm bg-gray-800 w-full border border-gray-600 border-opacity-30">
                    <div className="w-full flex justify-center mb-7 text-xl text-green-500">
                        <p style={{ fontWeight: "bold" }}>
                            OTP is sent to your Email &#x2713;
                        </p>
                    </div>

                    <OtpInput
                        inputStyle={{
                            backgroundColor: "#2d3748",
                            width: "60px",
                            height: "60px",
                            borderRadius: "10px",
                            fontSize: "2rem",
                            fontWeight: "bold",
                        }}
                        containerStyle={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginBottom: "20px",
                        }}
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span> </span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <div className="w-full mb-5 flex justify-end place-items-center text-lg text-cyan-500">
                        <p
                            className="cursor-pointer hover:underline"
                            onClick={() => {
                                handleResendOtp();
                            }}
                        >
                            resend OTP
                        </p>
                    </div>
                    <BlueButton
                        className="text-xl"
                        type="button"
                        onClick={() => {
                            handleSubmission();
                        }}
                    >
                        Verify
                    </BlueButton>
                    {complete && <Navigate to='/'/>}
                </Container>
            ) : (
                <Container className="max-w-sm bg-gray-800 w-full border border-gray-600 border-opacity-30">
                    <div className="w-full flex justify-center mb-7 text-xl text-red-500">
                        <p style={{ fontWeight: "bold" }}>
                            Reset your password
                        </p>
                    </div>

                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            className="w-full uppercase p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none autofill:bg-gray-800"
                            placeholder="USN"
                            autoComplete="off"
                            type="text"
                            required
                            {...register("usn")}
                        />

                        <input
                            className="w-full p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none autofill:bg-gray-800"
                            placeholder="Password"
                            autoComplete="off"
                            type="password"
                            required
                            {...register("password")}
                        />

                        {loading ? (
                            <GreenButton
                                disabled
                                className="text-xl"
                                type="submit"
                            >
                                Reset
                            </GreenButton>
                        ) : (
                            <GreenButton className="text-xl" type="submit">
                                Reset
                            </GreenButton>
                        )}
                    </form>
                </Container>
            )}
        </Body>
    );
}

export default ForgetPassword;
