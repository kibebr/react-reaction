import {
  createAction,
  createReducer,
  PayloadAction
} from '@reduxjs/toolkit'
import { withPayloadType } from './utils/withPayloadType'

export const ADD_TIME = createAction('ADD_TIME', withPayloadType<number>())

export const timesReducer = createReducer<number[]>([], {
  ADD_TIME: (state, { payload }: PayloadAction<number>) => state.concat(payload)
})
