import { configureStore } from '@reduxjs/toolkit'
import buttonStateReducer from '../features/buttonState/buttonSlice'

export default configureStore({
  reducer: {
    buttonState: buttonStateReducer,
    combo: comboReducer,
    average: averageReducer,
    times: timesReducer
  }
})
