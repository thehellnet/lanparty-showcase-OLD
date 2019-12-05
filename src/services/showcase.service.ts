import { WebsocketClient } from "@/protocol/websocketclient";
import PathUtility from "@/utilities/path.utility";
import { CommandFactory } from "@/protocol/commandfactory";
import { Command, Noun, Verb } from "@/protocol/commands";
import { EventDispatcher, Handler } from "@/utilities/event";

const URL = "ws://127.0.0.1:8080/lanparty_manager/api/public/ws/showcase";

const TAG = PathUtility.basename(window.location.href) || "anonymous";

class ShowcaseService {
  private websocketClient: WebsocketClient;

  private _onMessage = new EventDispatcher<any>();

  constructor() {
    this.websocketClient = new WebsocketClient(URL, TAG);

    this.websocketClient.onMessage(message => this.handleMessage(message));
    this.websocketClient.onConnect(() => this.handleConnect());
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
