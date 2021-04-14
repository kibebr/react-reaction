import {
  createAction,
  createReducer,
  PayloadAction
} from '@reduxjs/toolkit'
import { withPayloadType } from './utils/withPayloadType'

export const CALCULATE_FASTEST_TIME = createAction('CALCULATE_FASTEST_TIME', withPayloadType<number[]>())

export const fastestTimeReducer = createReducer(0, {
  CALCULATE_FASTEST_TIME: (_, { payload }: PayloadAction<number[]>) => Math.min(...payload)
})
