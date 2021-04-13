import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

export const ReactButton: FunctionComponent = ({ children }) => {
  return (
    <div className={classNames()}>
      {children}
    </div>
  )
}
