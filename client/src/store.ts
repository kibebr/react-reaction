import { combineReducers, createStore } from 'redux'
import { comboReducer } from './reducers/combo'
import { buttonStateReducer } from './reducers/buttonState'
import { averageReducer } from './reducers/average'
import { fastestTimeReducer } from './reducers/fastestTime'
import { timesReducer } from './reducers/times'

export const rootReducer = combineReducers({
  comboReducer,
  buttonStateReducer,
  averageReducer,
  fastestTimeReducer,
  timesReducer
})

export const store = createStore(rootReducer)

export type IRootState = ReturnType<typeof rootReducer>
