import React, {useState} from 'react'
import '../styles/global.css';
import '../styles/confirm-email.css';

export default function ConfirmEmail(props) {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setIsValidEmail(/^(|(".+"))@(student\.nust\.edu\.pk)|(seecs\.edu\.pk)$/.test(value));
      }
    
      const handleNextClick = (event) => {
        event.preventDefault();
        if (isValidEmail) {
          props.onHandleEnterOTP();
        }
      }

  return (
    <div>
        <div className="form-div">
            <form className="form">
                <h1>Confirm your email</h1>
                <p>Please enter your NUST issued email address</p>
                <div className="email-div">
                    {/* <input type="text" className="email-inp1" name="email"></input> */}
                    <input type="text" className="email-inp1" name="email" value={email} onChange={handleEmailChange}></input>
                    {!isValidEmail && <div className="error-msg">Please enter a valid NUST issued email address.</div>}
                </div>
                <div className="btn-div">
                    {/* <button onClick={props.onHandleEnterOTP} className="next-btn"><span className="next">Next</span><span className="gt">&gt;</span></button> */}
                    <button onClick={handleNextClick} className="next-btn" disabled={!isValidEmail}><span className="next">Next</span><span className="gt">&gt;</span></button>
                </div>
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <a onClick={props.onHandleLogin}>Sign in</a></span>
    </div>
  )
}
