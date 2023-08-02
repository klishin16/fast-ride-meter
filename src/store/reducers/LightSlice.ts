import { ILight } from "../../models/ILight";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITime } from "../../models/ITime";

interface ILightState {
  byId: Record<string, ILight>;
  allIds: string[];
}

const initialState: ILightState = {
  byId: {},
  allIds: []
}

interface IAddLightAction {
  id: string;
  name: string;
}

interface IPathLightAction {
  id: string;
  name: string;
  redDelta: number;
  greenDelta: number;
}

interface IRemoveLightAction {
  id: string;
}

export const lightSlice = createSlice({
  name: 'light',
  initialState,
  reducers: {
    addLight(state, action: PayloadAction<IAddLightAction>) {
      state.byId[action.payload.id] = {
        ...action.payload,
        redDelta: 0,
        greenDelta: 0
      };
      state.allIds.push(action.payload.id)
    },
    patchLight(state, action: PayloadAction<IPathLightAction>) {
      state.byId[action.payload.id] = action.payload
    },
    removeLight(state, action: PayloadAction<IRemoveLightAction>) {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter((id) => id !== action.payload.id)
    }
  }
})

export default lightSlice.reducer;
