import { createServer } from "http";
import WS_module from "./ws.js";
import { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

WS_module.serverSide(3030, createServer, WebSocketServer, () =>
  console.log("listening on port 3030")
).execute("wss", {
  message: (data) => {
    console.log("received: %s", `message rx from user ${data}`);
  },
});

function makeid(lgth) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < lgth; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/*
// Store client connections and their identifiers
const clients = [];

wss.on("connection", function connection(ws, request, client) {
  const connectionKey = new URLSearchParams(request.url.split("?")[1]).get(
    "connectionKey"
  );

  if (connectionKey != null) {
    console.log(connectionKey);
    let obj = {};
    obj.ws = ws;
    obj.client = client;
    obj.id = connectionKey;

    clients.push(obj);
    obj = {};
  }

  clients.forEach((client) => {
    const id = client["id"];
    console.log(client["id"]);
    console.log(clients.length);
    if (id == "1234") {
      setInterval(() => {
        console.log();
        client["ws"].send("bonjour");
      }, 3000);
    } else if (id == "5678") {
      setInterval(() => {
        client["ws"].send("hello");
      }, 3000);
    } else {
      client["ws"].send("random");
    }
  });

  ws.on("message", function incoming(message) {
    //console.log(clients[0]);
    // console.log("received: %s", `message rx from user ${client}`);
  });
});

//app.get("/", (req, res) => res.send("Hello World!"));

server.listen(6969, () => console.log(`Lisening on port :6969`));*/
