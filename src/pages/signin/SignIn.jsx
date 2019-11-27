import React from 'react'
import FormSignIn from "../../components/Connexion/FormSignIn";
import {Container} from "reactstrap"

const SignIn = (props) => {
        return (
            <div>
                <FormSignIn {...props}/>
            </div>
        )
}

export default SignIn;
