import { WebsocketClient } from "@/protocol/websocketclient";
import PathUtility from "@/utilities/path.utility";
import { CommandFactory } from "@/protocol/commandfactory";
import { Command, Noun, Verb } from "@/protocol/commands";

const URL = "ws://127.0.0.1:8080/lanparty_manager/api/public/ws/showcase";

const TAG = PathUtility.basename(window.location.href) || "anonymous";

class ShowcaseService {
  private websocketClient: WebsocketClient;

  constructor() {
    this.websocketClient = new WebsocketClient(URL, TAG);

    this.websocketClient.onMessage(message => this.onMessage(message));
    this.websocketClient.onConnect(() => this.onConnect());
  }

  public start(): void {
    this.websocketClient.start();
  }

  public send(command: Command): void {
    const message: string = JSON.stringify(command);
    this.websocketClient.send(message);
  }

  private onConnect(): void {
    const command = CommandFactory.prepare(Noun.PANE, Verb.GET);
    this.send(command);
  }

  private onMessage(message: string): void {}
}

const showcaseService = new ShowcaseService();
showcaseService.start();

export default showcaseService;
