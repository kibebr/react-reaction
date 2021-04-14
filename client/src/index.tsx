import React, {
  useState,
  useEffect,
  MouseEventHandler
} from 'react'
import { render } from 'react-dom'
import {
  secondsToMilliseconds,
  millisecondsToSeconds,
  getAverage
} from './utils/Math'
import { getRandomFromRange } from './utils/Random'
import classNames from 'classnames'
import './index.css'

type ButtonState
  = 'PRESS'
  | 'PAUSED'
  | 'FAILURE'
  | 'WAIT'

const App = (): JSX.Element => {
  const [buttonState, setButtonState] = useState<ButtonState>('PAUSED')
  const [offset, setOffset] = useState<number>(0)
  const [average, setAverage] = useState<number>(0)
  const [times, setTimes] = useState<number[]>([])
  const [combo, setCombo] = useState<number>(0)

  useEffect((): void => {
    if (times.length > 0) {
      setAverage(getAverage(times))
    }
  }, [times])

  useEffect(() => {
    let timer: number | null = null

    if (buttonState === 'WAIT') {
      timer = window.setTimeout(() => {
        setButtonState('PRESS')
      }, secondsToMilliseconds(getRandomFromRange(0, 5)))
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
      setTimes(times.concat(newOffset))
      setOffset(newOffset)
      setButtonState('PAUSED')
      setCombo((c) => c + 1)
    } else if (buttonState === 'PAUSED') {
      setOffset(0)
      setButtonState('WAIT')
    } else if (buttonState === 'WAIT') {
      setCombo(0)
      setButtonState('FAILURE')
    } else {
      setButtonState('WAIT')
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
          <span>{offset}ms or {millisecondsToSeconds(offset)} seconds</span>
          <span className='text-xl'>Press to start again.</span>
        </>
      )
    } else if (state === 'WAIT') {
      return (
        <div>Hold on.</div>
      )
    } else {
      return (
        <div>Too early.</div>
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
        <header className='max-w-screen-xl p-4 md:px-0 m-0 m-auto w-full'>
          <h1 className='text-white font-bold text-3xl md:text-5xl italic'>react-ion ⚡</h1>
        </header>

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
              <span className='text-2xl'>500ms</span>
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
              <li>{time}ms</li>
            ))}
          </ul>
        </div>

      </section>

      <div className='my-5' />

      <section className='px-4 md:px-0 m-0 m-auto max-w-screen-xl'>
        <h2 className='font-bold text-3xl'>Ranking</h2>
        <div>
        </div>
      </section>
    </div>
  )
}

render(<App />, document.getElementById('root'))
