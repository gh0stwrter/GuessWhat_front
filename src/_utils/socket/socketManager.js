    import apiVar from "../api/apiVar";
    import io from 'socket.io-client';
    export let socket = new WebSocket("ws://127.0.01:8000/ws");
    
            
            socket.onopen = () => {
                console.log("Attempting Connection...");    
                console.log("Successfully Connected");
                socket.send(apiVar.user.name)
                socket.onmessage = msg => {
                    console.log(msg)
                }
                socket.onclose = event => {
                    console.log("Socket Closed Connection: ", event);
                    socket.send("Client Closed!")
                };
                    
                socket.onerror = error => {
                    console.log("Socket Error: ", error);
                };
        }


    export const sendDataSocket  =() =>{

    }




