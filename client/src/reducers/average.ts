import {
  createAction,
  createReducer,
  PayloadAction
} from '@reduxjs/toolkit'
import { withPayloadType } from './utils/withPayloadType'
import { getAverage } from '../utils/Math'

export const CALCULATE_AVERAGE = createAction('CALCULATE_AVERAGE', withPayloadType<number[]>())

export const averageReducer = createReducer(0, {
  CALCULATE_AVERAGE: (_, { payload }: PayloadAction<number[]>) => getAverage(payload) | 0
})
