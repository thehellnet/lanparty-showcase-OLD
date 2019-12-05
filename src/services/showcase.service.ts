import { WebsocketClient } from "@/protocol/websocketclient";
import { PathUtility } from "@/utilities/path.utility";
import { CommandFactory } from "@/protocol/commandfactory";
import { Command, Noun, Verb } from "@/protocol/commands";
import { EventDispatcher, Handler } from "@/utilities/event";

const URL = "ws://127.0.0.1:8080/lanparty_manager/api/public/ws/showcase";

const TAG = PathUtility.basename(window.location.href) || "anonymous";

class ShowcaseService {
  private websocketClient: WebsocketClient;

  private _onConnect = new EventDispatcher<void>();
  private _onDisconnect = new EventDispatcher<void>();
  private _onMessage = new EventDispatcher<any>();

  constructor() {
    this.websocketClient = new WebsocketClient(URL, TAG);

    this.websocketClient.onConnect(() => {
      this._onConnect.fire();
      this.handleConnect();
    });

    this.websocketClient.onDisconnect(() => {
      this._onDisconnect.fire();
    });

    this.websocketClient.onMessage(message => {
      this.handleMessage(message);
    });
  }

  public onConnect(handler: Handler<void>) {
    this._onConnect.register(handler);
  }

  public onDisconnect(handler: Handler<void>) {
    this._onDisconnect.register(handler);
  }

  public onMessage(handler: Handler<any>) {
    this._onMessage.register(handler);
  }

  public start(): void {
    this.websocketClient.start();
  }

  public send(command: Command): void {
    const message: string = JSON.stringify(command);
    this.websocketClient.send(message);
  }

  private handleConnect(): void {
    const command = CommandFactory.prepare(Noun.PANE, Verb.GET);
    this.send(command);
  }

  private handleMessage(message: string): void {
    const content = JSON.parse(message);
    this._onMessage.fire(content);
  }
}

const showcaseService = new ShowcaseService();
showcaseService.start();

export default showcaseService;
