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
      <section className='flex flex-col items-center h-full'>
        <button
          className={classNames('w-full h-3/4 shadow-lg', {
            'bg-green-500': buttonState === 'PRESS',
            'bg-yellow-500': buttonState === 'WAIT',
            'bg-blue-500': buttonState === 'PAUSED'
          })}
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
    </>
  )
}

render(<App />, document.getElementById('root'))
