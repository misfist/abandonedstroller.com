import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import parse from "html-react-parser"

const Alert = ( { props: { message, type, dismissible } } ) => {
  const [alertOpenState, setAlertOpenState] = useState(true)

  const handleClose = ( event ) => {
    setAlertOpenState(false)
    event.target.classList.add( 'closed' );
  }

  const classes = classNames(
    'alert',
    `alert-${type}`,
    {
      'dismissible': dismissible
    }
  );

  return (
    <div 
      className={classes}
      aria-expanded={alertOpenState}
      role="alertdialog"
    >
      { dismissible && (
        <div 
         className={close}
         aria-label="Close"
         onClick={handleClose}
        ><span className="screen-reader-text">Close Alert</span></div>
      ) }
      {message}
    </div>
  )
}

export default Alert
