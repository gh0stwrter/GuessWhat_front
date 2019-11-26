import React, {useEffect, useState, useRef} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Drawing from './drawingComponent'
import apiVar from "../../_utils/api/apiVar";
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import { TiUser } from "react-icons/ti";
import {WebsocketConnection} from "../../_utils/socket/socketManager"



const COLORS = ["red", "blue", "orange", "green", "yellow", "purple"];


const Draw = (props) => {
    const classes = useStyles();
    const canvasRef = useRef(null);
    const [name, nameChange] = useState(localStorage.getItem('roomName'))
    const [username, uChange] = useState('')
    const [userlist, changeUserList] = useState([])
    const [isPressing, setIsPressing] = useState(false);
    const [prevLocation, setPrevLocation] = useState(null);
    const [color, setColor] = useState(COLORS[0]);
    const [socketData, setSocketData] = useState({
        reponses:[],
        position:[]
    });
    
console.log()
    const getTurn = async () => {

    }

   /* const sendDraw = async (msg) => {
        socket.send(JSON.stringify(msg))
        socket.onmessage = msg => {
                let dataSocket = JSON.parse(msg.data)
                let parsedData = JSON.parse(dataSocket.body)
                
            };

    }*/
    

    const getDraw = async () => {

    }

    const usersInRoom = async () => {

    }

    const getMessage = async (messages) => {

    }

    /*const sendReponse = async (reponses) => {
        socket.send(JSON.stringify(msg))
        socket.onmessage = msg => {
                let dataSocket = JSON.parse(msg.data)
                let parsedData = JSON.parse(dataSocket.body)
                console.log(parsedData)                
            };
    }*/

    const handleMouseDown = () => {
        setIsPressing(true);
    }

    const handleMouseUp = () => {
        setIsPressing(false);
        setPrevLocation(null);
    }

    const handleMouseMove = (e) => {
        if (!isPressing) {
            return;
        }

        if (prevLocation == null) {
            setPrevLocation({x: e.clientX, y: e.clientY});
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(prevLocation.x, prevLocation.y);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        setPrevLocation({x: e.clientX, y: e.clientY});
    }
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h2>Bienvenu sur le salon: {name}</h2>
                <span>c'est le tour de :</span>
            </div>
            <div className={classes.game}>

                <div className={classes.members}>
                    <div className={classes.online}>
                        <span><TiUser sty/>4 membres en lignes</span>
                        <ul>
                            <li>Brian</li>
                            <li>Zohair</li>
                            <li>Lucas</li>
                            <li>...</li>
                        </ul>
                    </div>
                </div>

                <div className={classes.draw}>
                    <div className={classes.messages}>
                        <div className={classes.received}>
                            <ul>
                                <li>Aujourd'hui - 00H11: Message</li>
                                <li>Aujourd'hui - 00H11: Message</li>
                                <li>Aujourd'hui - 00H11: Message</li>
                                <li>Aujourd'hui - 00H11: Message</li>
                                <li>Aujourd'hui - 00H11: Message</li>
                                <li>Aujourd'hui - 00H11: Message</li>
                                <li>Aujourd'hui - 00H11: Message</li>
                            </ul>
                        </div>
                        <div className={classes.sending}>
                            <input  type="text" className={classes.sendInput}/>
                            <Button >Envoyer</Button>
                        </div>
                    </div>

                    <div className={classes.canvas} id={'draw'}>
                        <Drawing />
                    </div>
                </div>
                <div className={classes.informations}>

                </div>

            </div>
        </div>
    )
    }
export default Draw;


const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        fontSize: 16,
        marginTop: 80,
    },
    game: {
        display: 'flex',
        flexDirection: 'row',
    },
    members: {
        display: 'flex',
        flexDirection: 'column',
        width: '15vw',
        height: '80vh',
        border: '1px solid black'
    },
    online: {
        width: '90%',
        height: '30%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid lightgrey',
        borderRadius: 5,
        margin: 11,
        overflow: 'auto'
    },
    draw: {
        display: 'flex',
        flexDirection: 'row',
        width: '65vw',
        height: '80vh',
        border: '1px solid black',
        marginLeft: 10,
        marginRight: 10,
    },
    canvas: {

    },
    messages: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        height: "100%",
        margin: 10
    },
    received: {
        display: 'flex',
        width: '100%',
        height: "90%",
        border: '1px solid lightgrey',
        borderRadius: 5,
        overflow: 'auto',
        boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
    },
    sending: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    sendInput: {
        width: '80%',
        height: "100%",
        marginRight: 5,
        border: '1px solid lightgrey',
        borderRadius: 5,
        outline: 'none'
    },
    informations: {
        display: 'flex',
        flexDirection: 'column',
        width: '15vw',
        height: '80vh',
        border: '1px solid black'
    },
}));
