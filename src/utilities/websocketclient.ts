import { EventDispatcher, Handler } from "@/utilities/event";

export class WebsocketClient {
  private readonly wsUrl: string;
  private readonly tag: string;

  private keepRunning: boolean = false;
  private running: boolean = false;

  private webSocket!: WebSocket;

  private _onMessage = new EventDispatcher<string>();

  constructor(wsUrl: string, tag: string) {
    this.wsUrl = wsUrl;
    this.tag = tag;
  }

  public start() {
    console.log("Starting Websocket");
    this.keepRunning = true;
    this.openWebsocket();
  }

  public stop() {
    console.log("Closing Websocket");
    this.keepRunning = false;
    this.closeWebsocket();
  }

  public send(message: string) {
    if (!this.running) {
      return;
    }

    this.webSocket.send(message);
  }

  public onMessage(message: Handler<string>) {
    this._onMessage.register(message);
  }

  private openWebsocket() {
    const url = `${this.wsUrl}/${this.tag}`;
    this.webSocket = new WebSocket(url);

    this.webSocket.onopen = ev => {
      console.log("Websocket onopen");
      this.running = true;
    };

    this.webSocket.onclose = ev => {
      console.log("Websocket onclose");
      this.running = false;
      this.checkRestart();
    };

    this.webSocket.onerror = ev => {
      console.log("Websocket onerror");
    };

    this.webSocket.onmessage = ev => {
      const message: string = ev.data;
      console.log("WebSocket onmessage", message);
      this._onMessage.fire(message);
    };
  }

  private closeWebsocket() {
    this.webSocket.close();
  }

  private checkRestart() {
    if (!this.keepRunning) {
      return;
    }

    setTimeout(() => {
      this.openWebsocket();
    }, 1000);
  }
}
