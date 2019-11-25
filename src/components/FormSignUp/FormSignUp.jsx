import React, {useState} from "react";
import apiVar from "../../_utils/api/apiVar";
import {SignUp} from "../../_utils/api/queries"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const FormSignUp = (props) => {
    const [username, uChange] = useState('')
    const [password, pChange] = useState('')
    const header = {
        "Content-Type": "Application/json"
    }
    const createNewUser = async () => {
      await SignUp(apiVar.signUp,{
            Name: username,
            Password: password
        })
        
    }

    return (
<Form>
        <FormGroup>
        <Label for="exampleEmail">Name</Label>
        <Input onChange={e => {uChange(e.target.value)}} type="text" name="name" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input onChange={e => {pChange(e.target.value)}}type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <Button onClick={createNewUser}>Envoyer</Button>
</Form>
    )
}
export default FormSignUp;