import React from 'react'
/////import style
import "./AuthOptions.scss"
import {Button} from "semantic-ui-react";

export default function AuthOptions(props) {

const {setSelectedForm}=props;


    return (
        <div className="auth-options">
         <h2>Join us for the best Spanish learning experience!</h2>
         <Button className="register" onClick={() => setSelectedForm("register")}>
         Sign up
         </Button>
         <Button className="login" onClick={()=> setSelectedForm("login")}>
         Log in
         </Button>
        </div>
    )
}