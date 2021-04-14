import React, {
  useState,
  useEffect,
  MouseEventHandler
} from 'react'
import { render } from 'react-dom'
import {
  secondsToMilliseconds,
  millisecondsToSeconds
} from './utils/Math'
import { getRandomFromRange } from './utils/Random'
import { getLastElement } from './utils/Array'
import { generateId } from './utils/Id'
import { Header } from './components/Header'
import { ADD_TIME } from './reducers/times'
import { CALCULATE_AVERAGE } from './reducers/average'
import { CALCULATE_FASTEST_TIME } from './reducers/fastestTime'
import { ButtonState, WAIT_BUTTON, FAIL_BUTTON, PRESS_BUTTON, PAUSE_BUTTON } from './reducers/buttonState'
import { INCREMENT_COMBO, RESET_COMBO } from './reducers/combo'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store, IRootState } from './store'
import classNames from 'classnames'
import './index.css'

const App = (): JSX.Element => {
  const [offset, setOffset] = useState<number>(0)

  const times = useSelector((state: IRootState) => state.timesReducer)
  const fastestTime = useSelector((state: IRootState) => state.fastestTimeReducer)
  const combo = useSelector((state: IRootState) => state.comboReducer)
  const average = useSelector((state: IRootState) => state.averageReducer)
  const buttonState = useSelector((state: IRootState) => state.buttonStateReducer)
  const dispatch = useDispatch()

  useEffect((): void => {
    if (times.length > 0) {
      dispatch(CALCULATE_AVERAGE(times))
      dispatch(CALCULATE_FASTEST_TIME(times))
    }
  }, [times])

  useEffect(() => {
    let timer: number | null = null

    if (buttonState === 'WAIT') {
      timer = window.setTimeout(() => {
        dispatch(PRESS_BUTTON)
      }, secondsToMilliseconds(getRandomFromRange(1, 5)))
    }

    if (buttonState === 'PRESS') {
      setOffset(offset - Date.now())
    }

    return (): void => {
      timer !== null && clearTimeout(timer)
    }
  }, [buttonState])

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (buttonState === 'PRESS') {
      const newOffset = offset + Date.now()
      dispatch(ADD_TIME(newOffset))
      setOffset(newOffset)
      dispatch(PAUSE_BUTTON)
      dispatch(INCREMENT_COMBO)
    } else if (buttonState === 'PAUSED') {
      setOffset(0)
      dispatch(WAIT_BUTTON)
    } else if (buttonState === 'WAIT') {
      dispatch(RESET_COMBO)
      dispatch(FAIL_BUTTON)
    } else {
      dispatch(WAIT_BUTTON)
    }
  }

  const renderMessage = (state: ButtonState): JSX.Element => {
    if (state === 'PRESS') {
      return (
        <div>Press!</div>
      )
    } else if (state === 'PAUSED') {
      return (
        <>
          {times.length > 0 && (
            <span>{getLastElement(times)}ms or {millisecondsToSeconds(getLastElement(times))} seconds</span>
          )}
          <span className='text-xl'>Press to start again.</span>
        </>
      )
    } else if (state === 'WAIT') {
      return (
        <div>Hold on.</div>
      )
    } else {
      return (
        <div>Too early. You lost your combo.</div>
      )
    }
  }

  return (
    <div className='h-full'>
      <section className={classNames('flex flex-col h-auto', {
        'bg-green-500': buttonState === 'PRESS',
        'bg-yellow-500': buttonState === 'WAIT',
        'bg-blue-500': buttonState === 'PAUSED',
        'bg-red-500': buttonState === 'FAILURE'
      })}>

        <Header />

        <button
          className='w-full h-96 shadow-lg'
          onClick={onButtonClick}
        >
          <div className='flex flex-col text-white font-bold text-4xl'>
            {renderMessage(buttonState)}
          </div>
        </button>
      </section>

      <div className='my-5' />

      <section className='max-w-screen-xl px-4 md:px-0 m-0 m-auto'>
        <h2 className='text-3xl font-bold'>Your scores</h2>

        <div className='my-3' />

        <div className='m-0 m-auto bg-white p-4 rounded-md shadow-md max-w-screen-lg font-bold'>
          <div className='flex flex-row justify-center space-x-4'>
            <div className='flex flex-1 flex-col items-center bg-gray-100 p-2 rounded-md'>
              <span className='text-2xl'>{combo}</span>
              <span className='text-gray-600'>COMBO</span>
            </div>
            <div className='flex flex-1 flex-col items-center p-2 bg-gray-100 rounded-md'>
              <span className='text-2xl'>{fastestTime}ms</span>
              <span className='text-gray-600'>FASTEST TIME</span>
            </div>
            <div className='flex flex-1 flex-col items-center p-2 bg-gray-100 rounded-md'>
              <span className='text-2xl'>{average}ms</span>
              <span className='text-gray-600'>AVERAGE</span>
            </div>
          </div>

          <div className='my-3' />

          <ul>
            {times.map((time) => (
              <li key={generateId()}>{time}ms</li>
            ))}
          </ul>
        </div>

      </section>
    </div>
  )
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
