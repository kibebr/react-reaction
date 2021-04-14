import React from 'react'
import { ReactComponent as GithubLogo } from '../../public/icons/github.svg'

export const Header = (): JSX.Element => {
  return (
    <header className='flex flex-row max-w-screen-xl p-4 md:px-0 m-0 m-auto w-full'>
      <h1 className='text-white font-bold text-3xl md:text-5xl italic'>react-reaction ⚡</h1>
      <a
        href='https://github.com/kibebr/react-reaction'
        className='text-white ml-auto font-bold text-3xl md:text-5xl italic'
      >
        <GithubLogo className='fill-current' />
      </a>
    </header>
  )
}
