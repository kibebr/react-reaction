import React, { useState, useEffect, MouseEventHandler } from 'react'
import { render } from 'react-dom'
import {
  secondsToMilliseconds,
  millisecondsToSeconds
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
  const [times, setTimes] = useState<number[]>([])
  const [combo, setCombo] = useState<number>(0)

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
    } else if (buttonState === 'PAUSED') {
      setOffset(0)
      setButtonState('WAIT')
    } else {
      setButtonState('PAUSED')
    }
  }

  return (
    <>
      <section className={classNames('flex flex-col h-auto', {
        'bg-green-500': buttonState === 'PRESS',
        'bg-yellow-500': buttonState === 'WAIT',
        'bg-blue-500': buttonState === 'PAUSED'
      })}>
        <header className='max-w-screen-xl p-4 md:px-0 m-0 m-auto w-full'>
          <h1 className='text-white font-bold text-3xl md:text-5xl'>Reaction Test</h1>
        </header>

        <button
          className='w-full h-96 shadow-lg'
          onClick={onButtonClick}
        >
          <div className='flex flex-col text-white font-bold text-4xl'>
            {buttonState === 'PAUSED' && times.length !== 0 && (
              <span>{offset}ms or {millisecondsToSeconds(offset)} seconds</span>
            )}
            <span>{
              buttonState === 'PAUSED'
                ? 'Press to start again.'
                : buttonState === 'PRESS'
                  ? 'PRESS'
                  : 'WAIT'
              }</span>
          </div>
        </button>
      </section>

      <div className='my-5' />

      <section className='max-w-screen-xl px-4 md:px-0 m-0 m-auto'>
        <h2 className='text-3xl font-bold'>Your scores</h2>

        <div className='my-3' />

        <div className='m-0 m-auto bg-white p-4 rounded-md shadow-md max-w-screen-lg'>
          <div className='flex flex-row justify-center space-x-4'>
            <div className='flex flex-col items-center'>
              <span className='font-bold text-2xl'>{combo}</span>
              <span className='font-bold text-gray-600'>COMBO</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold text-2xl'>500ms</span>
              <span className='font-bold text-gray-600'>FASTEST TIME</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

render(<App />, document.getElementById('root'))
