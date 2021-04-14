import { Action, Reducer } from 'redux'

// actions
export const INCREMENT_COMBO: Action<string> = ({ type: 'INCREMENT' })
export const RESET_COMBO: Action<string> = ({ type: 'RESET' })

// reducers
export const comboReducer: Reducer<number> = (state, action) => {
  switch (action) {
    case INCREMENT_COMBO:
      return state as number + 1
    default:
      return 0
  }
}
