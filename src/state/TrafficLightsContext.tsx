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

export enum ActionTypes {
  ADD_LIGHT = 'add_light',
  REMOVE_LIGHT = 'remove_light',
  ADD_METRIC = 'add_metric'
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
  }
}

export type TrafficLightActions = ActionMap<TrafficLightsPayload>[keyof ActionMap<TrafficLightsPayload>];
export const trafficLightReducer = (state: ITrafficLightsState, action: TrafficLightActions) => {
  switch (action.type) {
    case ActionTypes.ADD_LIGHT:
      const lights = state.trafficLights.byId
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
      } as ITrafficLightsState
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
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  return (
    <TrafficLightsContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

export { TrafficLightsProvider, TrafficLightsContext }
