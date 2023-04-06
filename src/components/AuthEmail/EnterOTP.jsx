import React, {useEffect, useState, useRef} from 'react'
import '../styles/global.css';
import '../styles/enter-otp.css';

var resend = "RESEND";

export default function EnterOTP(props) {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleOtpChange = (event, inputRef) => {
    const { value } = event.target;
    const { name } = event.target;
    if (value.length > 1) {
      return; // do nothing if input length is greater than 1
    }
    if(name == "otp1") setOtp1(value); // update state with the input value
    if(name == "otp2") setOtp2(value); // update state with the input value
    if(name == "otp3") setOtp3(value); // update state with the input value
    if(name == "otp4") setOtp4(value); // update state with the input value
    if (value.length === 1 && inputRef) {
        inputRef.current.focus(); // move cursor to next input field
      }
  };

  useEffect(() => console.log("otp: " + otp1+otp2+otp3+otp4));

  return (
    <div>
        <div className="form-div">
            <form className="form">
                <h1>Enter OTP</h1>
                <p>Enter the 4 digit code sent to your email</p>
                <div className="otp-div">
                    <input type="number" className="otp1-inp" name="otp1" value={otp1} onChange={(event) => handleOtpChange(event, input2Ref)} ref={input1Ref}></input>
                    <input type="number" className="otp2-inp" name="otp2" value={otp2} onChange={(event) => handleOtpChange(event, input3Ref)} ref={input2Ref}></input>
                    <input type="number" className="otp3-inp" name="otp3" value={otp3} onChange={(event) => handleOtpChange(event, input4Ref)} ref={input3Ref}></input>
                    <input type="number" className="otp4-inp" name="otp4" value={otp4} onChange={(event) => handleOtpChange(event, null)} ref={input4Ref}></input>
                </div>
                <div className="resend-div">
                    <button>{resend}</button>
                </div>
                <div className="otp-btn-div">
                    <button onClick={props.onHandleSignUp} className="otp-next-btn"><span className="otp-next">Next</span><span className="otp-gt">&gt;</span></button>
                </div>
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <a onClick={props.onHandleLogin}>Sign in</a></span>
    </div>
  )
}
