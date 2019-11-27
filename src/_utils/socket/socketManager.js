import io from 'socket.io-client';
const adminSocket = io('ws://127.0.01:8000/ws', {
    'reconnection limit':           10000,
    'max reconnection attempts':    Infinity,
    reconnection:                   true,
    upgrade:                        true,
    rememberUpgrade:                true,
    transports:                     ['websocket']
});

adminSocket.onopen = () => {
    console.log('sever connected');
    console.log(adminSocket)
}

adminSocket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    adminSocket.send("Client Closed!")
};

adminSocket.onerror = error => {
    console.log("Socket Error: ", error);
};

/*
export const socket = new WebSocket("ws://127.0.01:8000/ws");
console.log("Attempting Connection...");

socket.onopen = (callback) => {
    console.log("Successfully Connected");
    socket.send("Hi From the Client!")
    console.log(callback)
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onmessage = (event) => {
    console.log(event.data)
}

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
*/

/*const sendText = (id, data) => {
    const msg = {
        type: "message",
        text: data,
        id: id,
        date: Date.now()
    };
    socket.onopen = () => {
        socket.send(JSON.stringify(msg))
        socket.on('connect', () => {
            console.log(socket.id); // 'G5p5...'
        });
    }
};
sendText(1, 'coucou')*/

