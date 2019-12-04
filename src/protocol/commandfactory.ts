import { Noun, Verb } from "@/protocol/commands";

export class CommandFactory {
  public static prepare(noun: Noun, verb: Verb, args: any = {}) {
    return {
      noun,
      verb,
      args
    };
  }
}
