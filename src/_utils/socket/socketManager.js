export let socket = new WebSocket("ws://127.0.01:8000/ws");
console.log("Attempting Connection...");
socket.onopen = () => {
    console.log("Successfully Connected");
    socket.send("Hi From the Client!")
    socket.onmessage = (msg) => {
        console.log(msg)
/*        let data = JSON.parse(msg.data)
        console.log(JSON.parse(data))
        let messageServeur = JSON.parse(data.body)
        console.log(messageServeur)*/
    }
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

socket.onmessage = msg => {
/*    console.log(JSON.parse(msg.data));
    let dataSocket = JSON.parse(msg.data);
    let parsedData = JSON.parse(dataSocket.body);*/
/*    if (parsedData.type === 'DRAW') {
        if (parsedData.coords !== 'undefined' || parsedData.clientY !== 'undefined') {
            setBroadcast(parsedData)
        }
    }
    if (parsedData.type === 'MESSAGE') {
        setSocketData(() => (
            {reponses: [...socketData.reponses, parsedData]}))
    }*/
};
