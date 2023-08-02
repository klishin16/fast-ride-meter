import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMetric } from "../../models/IMetric";


interface IMetricState {
  byId: Record<string, IMetric>;
  allIds: string[]
}

const initialState: IMetricState = {
  byId: {},
  allIds: []
}

interface IAddMetricAction {
  id: string;
  lightId: string;
  time: Date;
  redDelta: number;
  greenDelta: number;
}

export const metricSlice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    addMetric(state, action: PayloadAction<IAddMetricAction>) {
      console.log('here', action.payload)
      state.byId[action.payload.id] = {...action.payload};
      state.allIds = state.allIds.concat(action.payload.id);
    },
    removeMetric(state, action: PayloadAction<{ id: string }>) {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter(id => id !== action.payload.id)
    }
  }
})

export const metricActions = metricSlice.actions
export default metricSlice.reducer;
