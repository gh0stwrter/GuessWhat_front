    import apiVar from "../api/apiVar";
    import io from 'socket.io-client';

    const socket = io();
    socket.on('connection', function(msg){
        console.log(msg)
    });

    /* export   let WebsocketConnection = () =>{
            let socket = new WebSocket("ws://127.0.01:8000/ws");
            
            socket.onopen = () => {
                console.log("Attempting Connection...");    
                console.log("Successfully Connected");
                socket.send(" Hi From the Client!")
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
        return socket 

    }*/


