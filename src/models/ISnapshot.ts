import { ELightColors } from "./ILight";

export interface ISnapshot {
  id: string;
  time: Date;
  color: ELightColors;
}
