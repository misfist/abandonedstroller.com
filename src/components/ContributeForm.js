import React, { useState, useRef } from 'react'
import Alert from './Alert'

const ContributeForm = () => {
  const [formIsSubmitted, setformIsSubmitted] = useState( false )
  const [formState, setFormState] = useState( null )
  const [formStatus, setFormStatus] = useState( null )
  const [responseProps, setResponseProps] = useState( {} )
  const message = useRef( null );

  const successMessage = 'Thanks so much for contributing!!'

  const errorMessage = 'Yikes. Something went wrong. Could you please try again?'

  const handleSuccess = ( event, response ) => {
    setformIsSubmitted( true );
    setFormState( 'success' );
    setResponseProps( {
      message: successMessage,
      type: 'success',
      dismissible: true
    } )
    console.log( response, responseProps );
  }

  const handleError = ( event, error ) => {
    setformIsSubmitted( true );
    setFormState( 'error' );
    setResponseProps( {
      message: errorMessage,
      type: 'error',
      dismissible: false
    } )
    console.error( error, responseProps );
  }

  const handleChange = ( event ) => {
    setFormState( { ...formState, [event.target.name]: event.target.value } )
    console.log( event, formState, message )
  }

  const handleSubmit = ( event ) => {
    event.preventDefault()
    
    let formData = new FormData( event.target )
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: new URLSearchParams(formData).toString()
    })
    .then( ( response ) => {
      if( response.status == 200 ) {
        handleSuccess( event, response )
      } else {
        handleError( event, response )
      }
    })
    .catch( ( error ) => { 
      handleError( event, error )
    })
  }

  return (
    <div className="contribute-form">
      {formIsSubmitted && (
        <Alert props={responseProps} />
      )}
      <form 
          name="contribute" 
          method="POST"
          action="/contribute"
          data-netlify="true" 
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" aria-required="true" onChange={handleChange} />
        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" onChange={handleChange} />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" onChange={handleChange} />
        <label htmlFor="picture">Picture</label>
        <input type="file" aria-required="true" name="picture" />
        <button type="submit">Send</button>
        <input type="hidden" name="form-name" value="contribute" />
      </form>
    </div>
  )
}

export default ContributeForm
