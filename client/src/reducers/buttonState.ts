import {
  createAction,
  createReducer
} from '@reduxjs/toolkit'

export type ButtonState
  = 'PRESS'
  | 'PAUSED'
  | 'FAILURE'
  | 'WAIT'

export const PRESS_BUTTON = createAction('PRESS_BUTTON')
export const PAUSE_BUTTON = createAction('PAUSE_BUTTON')
export const FAIL_BUTTON = createAction('FAIL_BUTTON')
export const WAIT_BUTTON = createAction('WAIT_BUTTON')

export const buttonStateReducer = createReducer<ButtonState>('PAUSED', {
  PRESS_BUTTON: (_) => 'PRESS',
  FAIL_BUTTON: (_) => 'FAILURE',
  WAIT_BUTTON: (_) => 'WAIT',
  PAUSE_BUTTON: (_) => 'PAUSED'
})
