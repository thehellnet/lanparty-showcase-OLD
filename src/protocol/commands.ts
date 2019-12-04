export enum Noun {
  TEST = "test",
  PANE = "pane"
}

export enum Verb {
  PING = "ping",
  TEXT = "text",
  GET = "get"
}

export class Command {
  noun: Noun;
  verb: Verb;
  args: any = {};

  constructor(noun: Noun, verb: Verb, args: any = {}) {
    this.noun = noun;
    this.verb = verb;
    this.args = args;
  }
}
