export enum ELightColors {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green'
}

export interface Light {
  id: string;
  name: string;
  metrics: Metric[];
}

export interface Metric {
  id: string;
  lightId: string;
  greenDelta?: number;
  redDelta?: number;
  time: Date;
  measurements: Measurement[];
  // comments: any
}

export interface Measurement {
  id: string;
  time: Date;
  color: ELightColors;
}
