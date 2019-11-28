import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import "../../index.css";
import { socket } from "../../_utils/socket/socketManager";

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

function Canvas() {
    const canvasRef = useRef(null);

    const [isPressing, setIsPressing] = useState(false);
    const [prevLocation, setPrevLocation] = useState(null);
    const [sendY, setsendY] = useState(0);
    const [sendX, setsendX] = useState(0);
    const [width, setWidth] = useState('37vw');
    const [height, setheight] = useState('65vh');
    const [color, setColor] = useState(COLORS[0]);

    useEffect(() => {
        console.log(canvasRef.current)
        console.log(canvasRef)
    })

    /*   const broadcastDraw =  async (clientX, clientY, prevX, prevY) => {
            let drawBroadcasting = {
                 clientX,
                 clientY,
                 prevX,
                 prevY
            }
            socket.onmessage = (draw) => {
                JSON.stringify(draw);
            };
   }*/

    /*   const broadcastDraw =  async (clientX, clientY, prevX, prevY) => {
           await console.log(clientX, clientY, prevX, prevY)
           const canvas = canvasRef.current;
           const ctx = canvas.getContext("2d");
           ctx.width = window.innerWidth;
           ctx.height = window.innerHeight;
           ctx.strokeStyle = color;
           ctx.lineWidth = 5;
           ctx.lineCap = "round";
           ctx.beginPath();
           ctx.moveTo(prevX, prevY);
           ctx.lineTo(clientX, clientY);
           ctx.stroke();
           setPrevLocation({x: clientX, y: clientY});
       }*/

    const handleMouseDown = () => {
        setIsPressing(true);
    }

    const handleMouseUp = () => {
        setIsPressing(false);
        setPrevLocation(null);
    }
    const drawComponent = () => {
       
    }
    const handleMouseMove = (e) => {
        if (!isPressing) {
            return;
        }

        if (prevLocation == null) {
            setPrevLocation({x: e.clientX, y: e.clientY});
            return;
        }

         socket.send(setPrevLocation)
         socket.onmessage = (msg) =>{
            console.log(msg)
         }
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");
        ctx.width = window.innerWidth;
        ctx.height = window.innerHeight;
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(prevLocation.x, prevLocation.y);
        ctx.lineTo(e.clientX, e.clientY);
        /*broadcastDraw(e.clientX, e.clientY, prevLocation.x, prevLocation.y);*/
        ctx.stroke();
        setPrevLocation({x: e.clientX, y: e.clientY});
       
    }

    return (
        <div>
            <div style={{display: 'flex', width: '100%', height: '100%'}}>

                <canvas
                    style={{
                        marginTop: 10,
                        width: '37vw',
                        height: '65vh',
                        border: '1px solid lightgrey',
                        borderRadius: 5,
                        boxShadow: "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                    }}
                    ref={canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    /*width={width}
                    height={height}*/
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                />
            </div>
            <Controls>
                {COLORS.map(c => (
                    <ColorButton key={c} onClick={() => setColor(c)} color={c}>
                        {c}
                    </ColorButton>
                ))}
            </Controls>
        </div>
    );
}

export default Canvas
