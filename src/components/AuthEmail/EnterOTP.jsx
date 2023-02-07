import React from 'react'
import '../styles/global.css';
import '../styles/enter-otp.css';

var resend = "RESEND";

export default function EnterOTP() {
  return (
    <div>
        <div className="form-div">
            <form className="form">
                <h1>Enter OTP</h1>
                <p>Enter the 4 digit code sent to your email</p>
                <div className="otp-div">
                    <input type="number" className="otp1-inp" name="otp1" maxlength="1"></input>
                    <input type="number" className="otp2-inp" name="otp2" maxlength="1"></input>
                    <input type="number" className="otp3-inp" name="otp3" maxlength="1"></input>
                    <input type="number" className="otp4-inp" name="otp4" maxlength="1"></input>
                </div>
                <div class="resend-div">
                    <button>{resend}</button>
                </div>
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <a href="">Sign in</a></span>
    </div>
  )
}
