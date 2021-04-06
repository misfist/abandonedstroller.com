import React, { useState, useRef  } from 'react'
import { navigate } from 'gatsby'
import Alert from './Alert'

function encode( data ) {
  const formData = new FormData()

  for ( const key of Object.keys( data ) ) {
    formData.append( key, data[key] )
  }

  return formData
}

const ContributeForm = () => {
  const [formState, setFormState] = useState( {} )
  const [formStatus, setFormStatus] = useState( null )
  const [formIsSubmitted, setFormIsSubmitted] = useState( false )
  const [responseProps, setResponseProps] = useState( {} )
  const submit = useRef( null );

  const successMessage = 'Thanks so much for contributing!!'
  const errorMessage = 'Yikes. Something went wrong. Could you please try again?'

  const handleSuccess = ( response ) => {
    setFormIsSubmitted( true );
    setFormStatus( 'success' );
    setResponseProps( {
      message: successMessage,
      type: 'success',
      dismissible: true
    } )
    console.log( 'handleSuccess', formState )

    submit.current.classList.add( 'success' )
  }

  const handleError = ( error ) => {
    setFormIsSubmitted( true );
    setFormStatus( 'error' );
    setResponseProps( {
      message: errorMessage,
      type: 'error',
      dismissible: false
    } )
    console.error( 'handleError', error, formState )

    submit.current.classList.add( 'error' )
  }

  const handleChange = ( event ) => {
    setFormState( { ...formState, [event.target.name]: event.target.value } )
    console.log( 'handleChange', formState )
  }

  const handleAttachment = ( event ) => {
    setFormState( { ...formState, [event.target.name]: event.target.files[0] } )
    console.log( 'handleAttachment', formState, event.target.getAttribute( 'accept' ) )
  }

  const handleSubmit = ( event ) => {
    event.preventDefault()
    const form = event.target;

    console.log( 'handleSubmit', formState )
    
    fetch('/', {
      method: 'POST',
      // headers: { "Content-Type": "multipart/form-data" },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formState
      })
    })
    .then( ( response ) => {
      console.log( 'fetch.then=>response', response )
      if( response.status == 200 ) {
        handleSuccess( response )
        navigate( form.getAttribute( 'action' ) )
      } else {
        handleError( response )
      }
    })
    .catch( ( error ) => { 
      handleError( error )
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
        action="/contribute/"
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
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
        <input type="file" aria-required="true" name="picture" accept="image/*" placeholder="Please add your photo"  onChange={handleAttachment} />
        <div className="submit-button"><button type="submit" name="submit-form" ref={submit}>Send</button></div>

        <input type="hidden" name="form-name" value="contribute" />
        <label htmlFor="bot-field" className="hidden">Don’t fill this out if you’re human:</label>
        <input className="hidden" name="bot-field" aria-hidden /> 
      </form>
    </div>
  )
}

export default ContributeForm
