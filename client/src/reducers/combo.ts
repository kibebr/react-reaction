import {
  createAction,
  createReducer
} from '@reduxjs/toolkit'

// actions
export const INCREMENT_COMBO = createAction('INCREMENT_COMBO')
export const RESET_COMBO = createAction('RESET_COMBO')

// reducers
export const comboReducer = createReducer<number>(0, {
  INCREMENT_COMBO: (x, _) => x + 1,
  RESET_COMBO: (_) => 0
})
