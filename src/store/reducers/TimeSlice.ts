import { ITime } from "../../models/ITime";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITimeState {
  byId: Record<string, ITime>;
  byLightId: Record<string, string[]>; // [lightId, [time1Id, time2Id, ...]
  allIds: string[];
}

const initialState: ITimeState = {
  byId: {},
  byLightId: {},
  allIds: []
}

interface IAddTimeAction {
  id: string;
  lightId: string;
  date: Date;
}

interface IRemoveTimeAction {
  id: string;
  lightId: string;
}


export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    addTime(state, action: PayloadAction<IAddTimeAction>) {
      state.byId[action.payload.id] = { id: action.payload.id, date: action.payload.date };
      state.byLightId[action.payload.lightId] = state.byLightId[action.payload.lightId] ? state.byLightId[action.payload.lightId].concat([action.payload.id]) : [action.payload.id];
      state.allIds.push(action.payload.id);
    },
    removeTime(state, action: PayloadAction<IRemoveTimeAction>) {
      delete state.byId[action.payload.id];
      state.byLightId[action.payload.lightId] = state.byLightId[action.payload.lightId].filter(timeId => timeId !== action.payload.id);
      state.allIds = state.allIds.filter((id) => id !== action.payload.id)
    }
  }
})

export default timeSlice.reducer;
