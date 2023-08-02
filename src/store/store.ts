import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import lightReducer from './reducers/LightSlice'
import metricReducer from './reducers/MetricSlice'
import timeReducer from './reducers/TimeSlice'
import uiReducer from './reducers/UISlice'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  lightReducer,
  metricReducer,
  timeReducer,
  uiReducer
})

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
