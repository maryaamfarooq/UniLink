import React, { Component } from 'react';
import './styles/global.css';
import "./styles/login.css";
import "./styles/choose-auth.css";

export default function ChooseAuth() {
  return (
    <div>
        <div className="form-div">
            <form className="form">
                <h1>Welcome!</h1>
                <p>Please select an authorization method:</p>
                <div className="btn-div">
                    <button className="auth-btn">NUST issued email address</button>
                    <button className="auth-btn">NUST issued identification card</button>
                </div>
                <div>

                </div>
            </form>
        </div>
        <span className="btm-sign-up">Already have an account? <a href="">Sign in</a></span>
    </div>
  )
}

