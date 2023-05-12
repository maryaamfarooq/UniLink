import React, { useEffect, useState, useRef } from "react";
import "../styles/global.css";
import "../styles/enter-otp.css";

var resend = "RESEND";
 export default function EnterOTP(props) {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [userOtp, setUserOtp] = useState('')
  const otp = props.otp.toString();
  const val = 0;
  const [otpVerified, setOtpVerified] = useState(false);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  useEffect(() => {
    setUserOtp(`${otp1}${otp2}${otp3}${otp4}`);
  }, [otp1, otp2, otp3, otp4])

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
      console.log(typeof input1Ref.current.value);
    if (Number(input1Ref.current.value) === Number(otp.charAt(0)) && Number(input2Ref.current.value) === Number(otp.charAt(1)) && Number(input3Ref.current.value) === Number(otp.charAt(2)) && Number(input4Ref.current.value) === Number(otp.charAt(3))) {
      // console.log("heyy")  
      setOtpVerified(true);
      } else {
        // console.log("nayy") 
        setOtpVerified(false);
      }
  };

  useEffect(() => {
    console.log(otp);
  })

  return (
    <div>
      <div className="form-div">
        <form className="form">
          <h1>Enter OTP</h1>
          <p>Enter the 4 digit code sent to your email</p>
          <div className="otp-div">
            <input
              type="number"
              className="otp1-inp"
              name="otp1"
              value={otp1}
              onChange={(event) => handleOtpChange(event, input2Ref)}
              ref={input1Ref}
            ></input>
            <input
              type="number"
              className="otp2-inp"
              name="otp2"
              value={otp2}
              onChange={(event) => handleOtpChange(event, input3Ref)}
              ref={input2Ref}
            ></input>
            <input
              type="number"
              className="otp3-inp"
              name="otp3"
              value={otp3}
              onChange={(event) => handleOtpChange(event, input4Ref)}
              ref={input3Ref}
            ></input>
            <input
              type="number"
              className="otp4-inp"
              name="otp4"
              value={otp4}
              onChange={(event) => handleOtpChange(event, null)}
              ref={input4Ref}
            ></input>
          </div>
          {otp1 === '' && otp2 === '' && otp3 === '' && otp4 === '' ? null : (otpVerified ? 
          (<p style={{ color: "green" }}>OTP Verified!</p>) : 
          ((otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '') ? <p style={{ color: "red" }}>OTP Not Verified!</p> : null))}
          {!otpVerified && <div className="resend-div">
            <button>{resend}</button>
          </div>}
          {otpVerified && (
           
              <div className="btn-div">
                      <button onClick={props.onHandleSignUp}className="next-btn" ><span className="next">Next</span><span className="gt">&gt;</span></button>
                  </div>
          )}
        </form>
      </div>
      <span className="btm-sign-up">
        Already have an account?{" "}
        <a onClick={props.onHandleLogin}>Sign in</a>
      </span>
    </div>
  );
          }  