import { Action, Reducer } from 'redux'

export type ButtonState
  = 'PRESS'
  | 'PAUSED'
  | 'FAILURE'
  | 'WAIT'

export const PRESS_BUTTON: Action<string> = ({ type: 'PRESS_BUTTON' })
export const PAUSE_BUTTON: Action<string> = ({ type: 'PAUSE_BUTTON' })
export const FAIL_BUTTON: Action<string> = ({ type: 'FAIL_BUTTON' })
export const WAIT_BUTTON: Action<string> = ({ type: 'WAIT_BUTTON' })

export const buttonStateReducer: Reducer<ButtonState> = (_, action) => {
  switch (action) {
    case PRESS_BUTTON:
      return 'PRESS'
    case FAIL_BUTTON:
      return 'FAILURE'
    case WAIT_BUTTON:
      return 'WAIT'
    case PAUSE_BUTTON:
      return 'PAUSED'
    default:
      return 'PAUSED'
  }
}
