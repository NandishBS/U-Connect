import nodemailer from "nodemailer";
import crypto from 'crypto'


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_APP_PASSWORD,
    },
});

const sendOtpTo = async (email) => {
    
    try {
        const otp = crypto.randomInt(1000,10000);
    
        const info = await transporter.sendMail({
            from: '"U-Connect" '+process.env.MY_EMAIL, 
            to: email,
            subject: "verify your OTP ✔",
            html: `<div style="text-align: center;">
            <img src="https://res.cloudinary.com/dd2qbbabx/image/upload/v1734862680/u-connect/eguiqpltqsu88v64f31h.jpg" alt="App Logo" style="width: 300px; height: auto;border-radius:20px" />
            <h1>${ otp }</h1>
            <h2>welcome to U-Connect</h2>
        </div>`,
        });
    
        if(!info){
            return null
        }
    
        return otp
    } catch (error) {
        console.log(error)
    }
};

export {sendOtpTo}