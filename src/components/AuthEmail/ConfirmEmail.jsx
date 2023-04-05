import React from 'react'
import '../styles/global.css';
import '../styles/confirm-email.css';

export default function ConfirmEmail(props) {
  return (
    <div>
        <div className="form-div">
            <form className="form">
                <h1>Confirm your email</h1>
                <p>Please enter your NUST issued email address</p>
                <div className="email-div">
                    <input type="text" className="email-inp1" name="email"></input>
                </div>
                <div className="btn-div">
                    <button onClick={props.onHandleEnterOTP} className="next-btn"><span className="next">Next</span><span className="gt">&gt;</span></button>
                </div>
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <a onClick={props.onHandleLogin}>Sign in</a></span>
    </div>
  )
}
