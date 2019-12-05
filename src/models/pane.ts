export enum PaneMode {
  SCORES,
  MATCHES,
  SINGLE_MATCH
}

export class Pane {
  id!: number;
  mode!: PaneMode;
  tournament?: number;
  match?: number;
}
