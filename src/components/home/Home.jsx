import React, {useState} from 'react'
import Nav from '../nav/Navigation';
import request from '../../model.js'


const Home = () => {

    const [username, uChange] = useState('')
    const [password, pChange] = useState('')

    const goReq = () => {
        request('sign-in',{
            "Name": username,
            "Password": password
        } )
    }

    return (
        <div>
            <Nav/>
            <form>
                <label>Username
                    <input onChange={(e) => {uChange( e.target.value )}} type="text" />
                </label>
                <label>Password
                    <input onChange={(e) => {pChange( e.target.value )}} type="password"/>
                </label>
                <button type="button" onClick={goReq}>Go</button>
            </form>
        </div>
    )
}

export default Home;