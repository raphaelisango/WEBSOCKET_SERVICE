import WebSocket from "ws";
import { WebSocketClient } from "./ws.js";
// Example usage:
const source = "6666";
const url = `ws://localhost:3030?connectionKey=${source}`;

const model = {
  destination: "5555",
  source: source,
  data: { speed: 5555, power: "5555 watt" },
  command: ["create", "update", ""],
  extradata: {},
};

const client = new WebSocketClient(source, url);
client.setModel(model);
client.connect();

/*import WebSocket from "ws";

let source = "6666";


const ws = new WebSocket(`ws://localhost:3030?connectionKey=${source}`);

ws.on("error", console.error);

ws.on("open", function open() {
  ws.send(JSON.stringify(model));
});
ws.send(JSON.stringify(model));
ws.on("message", function message(data) {
  console.log("received: %s", data);
  // ws.send(JSON.stringify(model));
});

let model = {
  destination: "5555",
  source: source,
  data: { speed: 5555, power: "5555 watt" },
  command: ["create", "update", ""],
  extradata: {},
};

function JSONdata(source, destination, dataoBJ, command, extradata) {
  let model = {
    source: source,
    destination: destination,
    data: dataoBJ,
    command: command,
    extradata: extradata,
  };

  return JSON.stringify(model);
}
*/
