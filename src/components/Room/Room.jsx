import React, {useEffect, useState, useRef} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {TiUser} from "react-icons/ti";
import Canvas from "./Canvas";
import apiVar from "../../_utils/api/apiVar";
import {socket} from "../../_utils/socket/socketManager"
import {Button} from 'reactstrap';

const Room = (props) => {
    const classes = useStyles();
    const [name] = useState(localStorage.getItem('roomName'));
    const [username, uChange] = useState(apiVar.user);
    const [reponse, setReponse] = useState('');
    const [Broadcast, setBroadcast] = useState([]);
    const [pressing, setIsPressing] = useState([]);
    const [clear, setClear] = useState(false);
    const [socketData, setSocketData] = useState({
        reponses: [],
        position: []
    });

    useEffect(() => {
        socket.onopen = (event) => {
            console.log('connected to socket bitch')
            console.log("New Socket Connection: ", event);
            socket.send(apiVar.user.name + ' Just connected to socket');
            let dataReponse = {
                type: "MESSAGE",
                name: apiVar.user.name,
                reponse: "Viens de rejoindre le chat",
                date: new Date(Date.now()).toLocaleDateString('fr')
            };
            socket.send(JSON.stringify(dataReponse));
        };
        socket.onclose = event => {
            console.log("Socket Closed Connection: ", event);
            socket.send(apiVar.user.name + "Just leave room")
            console.log(apiVar.user.name + "Just leave room")
        };
        socket.onerror = error => {
            console.log("Socket Error: ", error);
        };
        socket.onmessage = msg => {
            let dataSocket = JSON.parse(msg.data);
            let parsedData = JSON.parse(dataSocket.body);
            if (parsedData.type === 'DRAW') {
                if (parsedData.coords !== 'undefined' || parsedData.clientY !== 'undefined') {
                    setBroadcast(parsedData)
                }
            }
            if (parsedData.type === 'MESSAGE') {
                setSocketData(() => (
                    {reponses: [...socketData.reponses, parsedData]}))

            }
            if (parsedData.type === 'CLEAR') {
                setClear(true)
                setClear(false)
            }
            if (parsedData.type === 'PRESSING') {
                if(parsedData.value){
                    setIsPressing(parsedData.value)
                } else {
                    setIsPressing(parsedData.value)
                }
            }
        };
    });


    const getMessage = async (reponseInput) => {
        await setReponse(reponseInput)
    };

    const sendMessage = () => {
        let dataReponse = {
            type: "MESSAGE",
            name: apiVar.user.name,
            reponse: reponse,
            date: new Date(Date.now()).toLocaleTimeString('fr')
        };
        socket.send(JSON.stringify(dataReponse));
    };

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h2>Bienvenu sur le salon: {name}</h2>
                <span>salon créé par: Lucas</span>
            </div>
            <div className={classes.game}>
                <div className={classes.members}>
                    <div className={classes.online}>
                        <span><TiUser/>4 membres en lignes</span>
                        <ul style={{listStyle: 'none'}}>
                            <li style={{align: 'left', marginRight: 30}}>Brian</li>
                            <li>Zohair</li>
                            <li>Lucas</li>
                            <li>...</li>
                        </ul>
                    </div>
                    <div className={classes.turn}>
                        <span>C'est le tour de: Brian</span>
                        <span>tour suivant: zohair</span>
                    </div>

                    <div className={classes.points}>
                        <span>Lucas: 30 points</span>
                        <span>Zohair: 30 points</span>
                        <span>Brian: 30 points</span>
                    </div>
                </div>

                <div className={classes.draw}>
                    <div className={classes.messages}>
                        <div className={classes.received}>
                            <ul>
                                {socketData.reponses.map((item, index) => (
                                    <li style={{listStyle: 'none'}} key={index}>
                                        {item.reponse === "Viens de rejoindre le chat" ?
                                            <span style={{
                                                fontWeight: 600,
                                                color: 'red'
                                            }}>{item.name}{' viens de rejoindre le salon'}{'\n'}</span>
                                            : <span style={{
                                                fontWeight: 400,
                                                color: 'black'
                                            }}><strong>{item.date}</strong>, <strong>{item.name}</strong> :{item.reponse}{'\n'}</span>}
                                        <hr/>
                                    </li>)
                                )}
                            </ul>
                        </div>
                        <div className={classes.sending}>
                            <input onChange={e => getMessage(e.target.value)} onKeyUp={(event) => {
                                if (event.keyCode === 13) {
                                    sendMessage();
                                }
                            }}
                                   style={{boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"}}
                                   type="text"
                                   className={classes.sendInput}/>
                            <Button onClick={() => {
                                sendMessage();
                            }}>Envoyer</Button>
                        </div>
                    </div>

                    <div className={classes.canvas} id={'draw'}>
                        <Canvas isTurn={apiVar.user.name !== "Brian"}
                                X={Broadcast.coords}
                                Y={Broadcast.clientY}
                                color={Broadcast.color}
                                brush={Broadcast.bursh}
                                isPressing={pressing}
                                prevLocation={Broadcast.prevLocation}
                                clear={clear}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Room;


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
        width: '100%',
        height: "100%",
    },
    members: {
        display: 'flex',
        flexDirection: 'column',
        width: '15vw',
        height: '80vh',
    },
    online: {
        display: 'flex',
        width: '90%',
        height: '30%',
        flexDirection: 'column',
        border: '1px solid lightgrey',
        borderRadius: 5,
        margin: 11,
        overflow: 'auto',
        boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
    },
    draw: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '60vh',
        marginLeft: 10,
        marginRight: 10,
    },
    canvas: {
        height: '100%',
        width: '80%',
    },
    messages: {
        display: 'flex',
        flexDirection: 'column',
        width: 400,
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
    turn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid lightgrey',
        borderRadius: 5,
        margin: 11,
        padding: 5,
        boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
    },
    points: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid lightgrey',
        borderRadius: 5,
        margin: 11,
        padding: 5,
        boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
    },
}));
