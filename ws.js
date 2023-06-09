var clientsArr = [];
class WsClass {
  server;
  wss;
  wsClient;
  constructor() {}

  serverSide(PORT, createServer, WebSocketServer, listenfunc) {
    this.server = createServer();
    this.wss = new WebSocketServer({ server: this.server });
    this.server.listen(PORT, listenfunc);

    return this;
  }
  clientSide(URL, WebSocket) {
    this.wsClient = new WebSocket(URL);
    this.wsClient.on("error", console.error);

    this.wsClient.on("open", function open() {
      ws.send("Connection is opened");
    });
  }

  execute(context, params) {
    switch (context) {
      case "wss":
        this.wss.on("connection", function connection(ws, request) {
          const connectionKey = new URLSearchParams(
            request.url.split("?")[1]
          ).get("connectionKey");
          console.log(`User ${connectionKey} in connected`);
          //console.log(clientsArr, connectionKey);
          mapkey(connectionKey, ws, clientsArr);

          ws.on("error", console.error);

          ws.on("message", (data) => {
            // console.log(Parse(data));
            routing(data, clientsArr);
            params.message(data);
          });

          //ws.send("something");
        });

        break;

      case "wsClient":
        break;

      default:
        break;
    }
  }
}

export class WebSocketClient {
  constructor(source, url) {
    this.source = source;
    this.url = url;
  }

  setModel(model) {
    this.model = model;
  }

  connect(WebSocket) {
    this.ws = new WebSocket(this.url);

    this.ws.on("error", console.error);
    this.ws.on("open", () => {
      this.ws.send(JSON.stringify(this.model));
    });
    this.ws.on("message", (data) => {
      console.log("received: %s", data);
      // this.ws.send(JSON.stringify(this.model));
    });
  }

  send(data) {
    this.ws.send(data);
  }

  close() {
    this.ws.close();
  }
}

export function WServer() {
  return new WsClass();
}
export function WSClient(source, url) {
  return new WebSocketClient(source, url);
}

function mapkey(connectionKey, ws, arr) {
  if (connectionKey != null) {
    if (arr.length > 0) {
      arr.forEach((item) => {
        //check if key already exist
        let id = item["id"];
        if (id == connectionKey) {
          // console.log(id, connectionKey);
          return arr;
        } else {
          // console.log("sec2");
          //  console.log(arr);
          let obj = {};
          obj.ws = ws;
          obj.id = connectionKey;

          arr.push(obj);
          obj = {};
          return arr;
        }

        //  console.log(arr.length);
      });
    } else {
      //console.log("sec23");
      // console.log(arr);
      let obj = {};
      obj.ws = ws;
      obj.id = connectionKey;

      arr.push(obj);
      obj = {};
      return arr;
    }
  }
}

function Parse(data) {
  return JSON.parse(data);
}

function routing(data, clientArr) {
  let datA = Parse(data);

  clientArr.forEach((index) => {
    console.log("in");
    const id = index["id"];
    console.log(index["id"]);

    if (id == datA.destination) {
      index["ws"].send(data);
    }
  });
}
