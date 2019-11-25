import React from 'react'
import FormSignIn from "../../components/FormSignIn/FormSignIn";
import {Container} from "reactstrap"

const SignIn = (props) => {
        return (
            <div>
                    <FormSignIn {...props}/>
            </div>
        )
}

export default SignIn;