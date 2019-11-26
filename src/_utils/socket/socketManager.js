export let socket = new WebSocket("ws://127.0.01:8000/ws");
        console.log("Attempting Connection...");
        socket.onopen = () => {
            console.log("Successfully Connected");
            socket.send("Hi From the Client!")
        };
        
        socket.onclose = event => {
            console.log("Socket Closed Connection: ", event);
            socket.send("Client Closed!")
        };

        socket.onerror = error => {
            console.log("Socket Error: ", error);
        };

       export let sendMsg = msg => {
            socket.send(JSON.stringify(msg))
            socket.onmessage = msg => {
                    let dataSocket = JSON.parse(msg.data)
                    let parsedData = JSON.parse(dataSocket.body)
                    console.log(parsedData)
              };
    
        }
        
        
          
          