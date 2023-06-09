import { WSClient } from "./ws.js";
import { WServer } from "./ws.js";

function WS(type) {
  //(type,sourceId, url) for client
  switch (type) {
    case "client":
      return WSClient(arguments[1], arguments[2]); //sourceid, url

    case "server":
      return WServer();

    default:
      console.error("invalid argument");
      break;
  }
}

export default WS;
