export enum ELightColors {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green'
}

export interface Light {
  id: string;
  name: string;
  greenDelta: number;
  redDelta: number;
  times: Date[];
}

export interface Metric {
  id: string;
  lightId: string;
  greenDelta: number;
  redDelta: number;
  time: Date;
  // comments: any
}

export interface Measurement {
  id: string;
  time: Date;
  color: ELightColors;
}
