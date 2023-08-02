export interface ILight {
  id: string;
  name: string;
  greenDelta: number;
  redDelta: number;
}

export enum ELightColors {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green'
}
