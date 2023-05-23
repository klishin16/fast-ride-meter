import React, { createContext, useReducer } from "react";
import { Light, Metric } from "../types";

interface ITrafficLightsState {
  trafficLights: {
    byId: Record<string, Light>;
    allIds: string[];
  },
  metrics: {
    byId: Record<string, Metric>;
    allIds: string[]
  }
}

const initialState: ITrafficLightsState = {
  trafficLights: {
    byId: {
      '1': {
        id: '1',
        name: 'Test light',
        metrics: []
      },
      '2': {
        id: '2',
        name: 'Test light 2',
        metrics: []
      }
    },
    allIds: ['1', '2']
  },
  metrics: {
    byId: {},
    allIds: []
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key;
    }
    : {
      type: Key;
      payload: M[Key];
    }
};

const LOCAL_STORAGE_KEY = 'traffic_lights_data';

const withSaveState = (reducer: (state: ITrafficLightsState, action: TrafficLightActions) => ITrafficLightsState) => {
  return (state: ITrafficLightsState, action: TrafficLightActions) => {
    const newState = reducer(state, action);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    return newState;
  }
}

const getSavedState = (): ITrafficLightsState | null => {
  const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return jsonData ? JSON.parse(jsonData) : null;
}

export enum ActionTypes {
  ADD_LIGHT = 'add_light',
  REMOVE_LIGHT = 'remove_light',
  ADD_METRIC = 'add_metric',
  REMOVE_METRIC = 'remove_metric'
}

type TrafficLightsPayload = {
  [ActionTypes.ADD_LIGHT] : {
    id: string;
    name: string;
  };
  [ActionTypes.REMOVE_LIGHT]: {
    id: string;
  },
  [ActionTypes.ADD_METRIC]: {
    id: string;
    lightId: string;
    time: Date;
    redDelta: number;
    greenDelta: number;
  },
  [ActionTypes.REMOVE_METRIC]: {
    id: string;
  },
}

export type TrafficLightActions = ActionMap<TrafficLightsPayload>[keyof ActionMap<TrafficLightsPayload>];
export const trafficLightReducer = (state: ITrafficLightsState, action: TrafficLightActions) => {
  switch (action.type) {
    case ActionTypes.ADD_LIGHT:
      const lights = state.trafficLights.byId;
      lights[action.payload.id] = {
        ...action.payload,
        metrics: []
      }
      return {
        ...state,
        trafficLights: {
          byId: lights,
          allIds: state.trafficLights.allIds.concat(action.payload.id)
        }
      } as ITrafficLightsState
    case ActionTypes.REMOVE_LIGHT:
      const lights1 = state.trafficLights.byId;
      delete lights1[action.payload.id];
      return {
        ...state,
        trafficLights: {
          byId: lights1,
          allIds: state.trafficLights.allIds.filter((id) => id !== action.payload.id)
        }
      }
    case ActionTypes.ADD_METRIC:
      const metrics = state.metrics.byId;
      metrics[action.payload.id] = {
        ...action.payload,
        measurements: []
      }
      return {
        ...state,
        metrics: {
          byId: metrics,
          allIds: state.metrics.allIds.concat(action.payload.id)
        }
      }
    case ActionTypes.REMOVE_METRIC:
      const metrics1 = state.metrics.byId;
      delete metrics1[action.payload.id];
      return {
        ...state,
        metrics: {
          byId: metrics1,
          allIds: state.metrics.allIds.filter((id) => id !== action.payload.id)
        }
      }
    default:
      return state;
  }
}

const TrafficLightsContext = createContext<{
  state: ITrafficLightsState;
  dispatch: React.Dispatch<TrafficLightActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const TrafficLightsProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(withSaveState(trafficLightReducer), getSavedState() ?? initialState);

  return (
    <TrafficLightsContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

export { TrafficLightsProvider, TrafficLightsContext }
