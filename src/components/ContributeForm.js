import React, { useState, useRef } from 'react'
import Alert from './Alert'

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

const ContributeForm = () => {
  const [formIsSubmitted, setFormIsSubmitted] = useState( false )
  const [formState, setFormState] = useState( null )
  const [formStatus, setFormStatus] = useState( null )
  const [responseProps, setResponseProps] = useState( {} )
  const message = useRef( null );

  const successMessage = 'Thanks so much for contributing!!'

  const errorMessage = 'Yikes. Something went wrong. Could you please try again?'

  const handleSuccess = ( event, response ) => {
    setFormIsSubmitted( true );
    setFormStatus( 'success' );
    setResponseProps( {
      message: successMessage,
      type: 'success',
      dismissible: true
    } )

    console.log( event, responseProps )
  }

  const handleError = ( event, error ) => {
    setFormIsSubmitted( true );
    setFormStatus( 'error' );
    setResponseProps( {
      message: errorMessage,
      type: 'error',
      dismissible: false
    } )
    console.error( error, responseProps );
  }

  const handleChange = ( event ) => {
    setFormState( { ...formState, [event.target.name]: event.target.value } )
  }

  const handleAttachment = ( event ) => {
    setFormState( { ...formState, [event.target.name]: event.target.files[0] } )
  }

  const handleSubmit = ( event ) => {
    event.preventDefault()
    const form = event.target;
    
    fetch('/', {
      method: 'POST',
      // headers: { "Content-Type": "multipart/form-data" },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formState
      })
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
          data-netlify-recaptcha="true"
          onSubmit={handleSubmit}
      >
        <label htmlFor="fullname">Name</label>
        <input type="text" name="fullname" onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" aria-required="true" required onChange={handleChange} />
        <label htmlFor="subject">Subject</label>
        <input type="text" name="subject" onChange={handleChange} />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" onChange={handleChange} />
        <label htmlFor="picture">Picture</label>
        <input type="file" aria-required="true" name="picture"  onChange={handleAttachment} placeholder="Please add your photo" />
        <div className="recap" data-netlify-recaptcha="true"></div>
        <button type="submit">Send</button>
        <input type="hidden" name="form-name" value="contribute" />
        <label htmlFor="bot-field" className="hidden">Don’t fill this out if you’re human:</label>
        <input className="hidden" name="bot-field" /> 
      </form>
    </div>
  )
}

export default ContributeForm
