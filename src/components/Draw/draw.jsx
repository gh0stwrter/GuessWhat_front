import React, {useState} from "react";
import apiVar from "../../_utils/api/apiVar";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Draw = (props) => {
    const [username, uChange] = useState('')
    const [userlist, changeUserList] = useState([])


    const getGame = async () => {

    }

    return (
        <Form>
            <h1>Test</h1>
        </Form>
    )
}
export default Draw;
