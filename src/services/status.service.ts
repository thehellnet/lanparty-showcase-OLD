import { EventDispatcher, Handler } from "@/utilities/event";

class StatusService {
  private _websocketConnected: boolean = false;

  private _onWebsocketConnected = new EventDispatcher<boolean>();

  get websocketConnected(): boolean {
    return this._websocketConnected;
  }

  set websocketConnected(value: boolean) {
    this._websocketConnected = value;
    this._onWebsocketConnected.fire(this._websocketConnected);
  }

  public onWebsocketConnected(handler: Handler<boolean>) {
    this._onWebsocketConnected.register(handler);
  }
}

const statusService = new StatusService();
export default statusService;
