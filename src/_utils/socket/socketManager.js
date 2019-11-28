export let socket = new WebSocket("ws://127.0.01:8000/ws");
        console.log("Attempting Connection...");
        socket.onopen = () => {
            console.log("Successfully Connected");
            socket.send("Hi From the Client!")
            socket.onmessage = (msg) => {
                console.log(msg)
            }
        };
        
        socket.onclose = event => {
            console.log("Socket Closed Connection: ", event);
            socket.send("Client Closed!")
        };

        socket.onerror = error => {
            console.log("Socket Error: ", error);
        };

        let connect = cb => {
            console.log("connecting");
          
            socket.onopen = () => {
              console.log("Successfully Connected");
            };
          
            socket.onmessage = msg => {
              console.log(msg);
              cb(msg);
            };
          
            socket.onclose = event => {
              console.log("Socket Closed Connection: ", event);
            };
          
            socket.onerror = error => {
              console.log("Socket Error: ", error);
            };
          };