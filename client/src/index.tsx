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
    <div className='h-full'>
      <section className={classNames('flex flex-col h-auto', {
        'bg-green-500': buttonState === 'PRESS',
        'bg-yellow-500': buttonState === 'WAIT',
        'bg-blue-500': buttonState === 'PAUSED'
      })}>
        <header className='max-w-screen-xl p-4 md:px-0 m-0 m-auto w-full'>
          <h1 className='text-white font-bold text-3xl md:text-5xl italic'>react-ion ⚡</h1>
        </header>

        <button
          className='w-full h-96 shadow-lg'
          onClick={onButtonClick}
        >
          <div className='flex flex-col text-white font-bold text-4xl'>
            {buttonState === 'PAUSED' && times.length !== 0 && (
              <span>{offset}ms or {millisecondsToSeconds(offset)} seconds</span>
            )}
            <div className='my-2' />
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
              <span className='text-2xl'>32ms</span>
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
