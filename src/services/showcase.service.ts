import { WebsocketClient } from "@/utilities/websocketclient";

const URL = "ws://127.0.0.1:8080/lanparty_manager/api/public/ws/showcase";
const TAG = "showcase1";

const websocketClient = new WebsocketClient(URL, TAG);
websocketClient.start();
export default websocketClient;
