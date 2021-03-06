import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import "../../index.css";
import {socket} from "../../_utils/socket/socketManager";
import apiVar from "../../_utils/api/apiVar";
import {Button} from "@material-ui/core";

const COLORS = ["red", "blue", "orange", "green", "black", "purple"];

const Controls = styled.menu`
  display:flex;
  width: 100%;
`;

const ColorButton = styled.button`
  background-color: ${props => props.color};
  margin: 10px;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  color: lightgrey;
`;

function Canvas(props) {
    const canvasRef = useRef(null);

    const [isPressing, setIsPressing] = useState(false);
    const [isTurn, setTurn] = useState(props.isTurn);
    const [prevLocation, setPrevLocation] = useState(null);
    const [brush, setBrush] = useState(5);
    const [clear, setClear] = useState(props.clear);
    const [sendX, setsendX] = useState(0);
    const [width, setWidth] = useState('37vw');
    const [height, setheight] = useState('65vh');
    const [color, setColor] = useState(COLORS[0]);

    useEffect(() => {
        if(props.clear){
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (isTurn) {
            drawingBroadcast().then(res => console.log(res)).catch(error => {
                throw new Error(error)
            });
        }
        // eslint-disable-next-line no-use-before-define
    }, [isTurn, props]);

    const sendDraw = async (clientX, clientY, prevX, prevY, isPressing, prevLocation) => {
        let data = {
            name: apiVar.user.name,
            type: "DRAW",
            coords: clientX, clientY, prevX, prevY,
            color: color,
            bursh: brush,
            isPressing: isPressing,
            prevLocation: prevLocation,
        }
        await socket.send(JSON.stringify(data))
    }

    const drawingBroadcast = async () => {
        if (!props.isPressing) {
            return;
        }
        if (props.X !== 'undefined' && props.Y !== 'undefined') {
            if (prevLocation == null) {
                setPrevLocation({x: props.X, y: props.Y});
                return;
            }
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.width = window.innerWidth;
            ctx.height = window.innerHeight;
            ctx.strokeStyle = props.color;
            ctx.lineWidth = props.brush;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(prevLocation.x - 640, prevLocation.y - 160);
            ctx.lineTo(props.X - 640, props.Y - 160) ;
            ctx.stroke();
            setPrevLocation({x: props.X, y: props.Y});
        }
    };

    const handleMouseDown = () => {
        setIsPressing(true);
        let sendIsPressing = {
            type: "PRESSING",
            value: true,
            room: localStorage.getItem('roomName'),
        };
        socket.send(JSON.stringify(sendIsPressing));
    };

    const handleMouseUp = () => {
        setIsPressing(false);
        setPrevLocation(null);
        let sendIsPressing = {
            type: "PRESSING",
            value: false,
            prevLocation: null,
            room: localStorage.getItem('roomName'),
        };
        socket.send(JSON.stringify(sendIsPressing));
    };


    const handleMouseMove = (e) => {
        if (!isTurn) {
            if (!isPressing) {
                return;
            }
            if (prevLocation == null) {
                setPrevLocation({x: e.clientX, y: e.clientY});
                return;
            }
            const canvas = canvasRef.current;
            /*canvas.width = 800;
            canvas.height = 800;*/
            const ctx = canvas.getContext("2d");
            ctx.strokeStyle = color;
            ctx.lineWidth = brush;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(prevLocation.x - 640, prevLocation.y - 160);
            ctx.lineTo(e.clientX - 640, e.clientY - 160);
            console.log(e.clientX, e.clientY)
            sendDraw(e.clientX, e.clientY, prevLocation.x, prevLocation.y, isPressing, prevLocation);
            ctx.stroke();
            setPrevLocation({x: e.clientX, y: e.clientY});
        }
    };

    return (
        <div>
            <div>
                <canvas
                    style={{
                        marginTop: 10,
                        width: 900,
                        height: 700,
                        position: "relative",
                        border: '1px solid lightgrey',
                        borderRadius: 5,
                        boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                    }}
                    ref={canvasRef}
                    width={900}
                    height={700}
                    onMouseDown={!isTurn ? handleMouseDown : null}
                    onMouseUp={!isTurn ? handleMouseUp : null}
                    onMouseMove={!isTurn ? handleMouseMove : null}
                />
            </div>
            <Controls>
                <Button style={{width: 80, height: 50, marginTop: 5, marginRight: 5}} disabled={isTurn} onClick={() => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let clearBroadcast = {
                        type: "CLEAR",
                        name: apiVar.user.name,
                        room: localStorage.getItem('roomName'),
                        date: new Date(Date.now()).toLocaleDateString('fr')
                    };
                    socket.send(JSON.stringify(clearBroadcast));
                }}>Nettoyer</Button>
                {COLORS.map(c => (
                    <ColorButton disabled={isTurn} key={c} onClick={() => setColor(c)} color={c}>
                        {c}
                    </ColorButton>
                ))}
                <input style={{width: 40, height: 40, marginTop: 12}} id="number" type="number" value={brush}
                       onChange={(event) => {
                           setBrush(event.target.value)
                       }}/>
            </Controls>
        </div>
    );
}

export default Canvas
