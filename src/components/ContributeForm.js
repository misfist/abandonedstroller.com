import React, { useState, useRef } from 'react'

const ContributeForm = () => {
  const [formIsSubmitted, setformIsSubmitted] = useState(false)
  const [formState, setFormState] = useState(null)
  const message = useRef( null );
  const form = useRef( null )

  const successMessage = `<span className="alert alert-success">Thanks so much for contributing!!</span>`

  const errorMessage = `<span className="alert alert-error">Yikes. Something went wrong. Could you please try again?</span>`

  const handleSuccess = ( event, response ) => {
    setformIsSubmitted( true );
    console.log( event, response );
  }

  const handleError = ( event, error ) => {
    setformIsSubmitted( false );
    console.log( event, error );
  }

  const handleChange = ( event ) => {
    setFormState( { ...formState, [event.target.name]: event.target.value } )
    console.log( event, formState, message )
  }

  const handleSubmit = ( event ) => {
    event.preventDefault()
    
    // let form = event.target;
    let formData = new FormData( event.target )
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: new URLSearchParams(formData).toString()
    //   body: encode({
    //     'form-name': form.getAttribute('name'),
    //     ...formState,
    //   }),
    })
    .then( ( response ) => {
        navigate( form.getAttribute('action') )
        handleSuccess( event, response )
    })
    .catch( ( error ) => { 
        console.log( error )
        handleError( event, error )
    })
  }

  return (
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
      <input type="email" name="email" onChange={handleChange} />
      <label htmlFor="subject">Subject</label>
      <input type="text" name="subject" onChange={handleChange} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" onChange={handleChange} />
      <label htmlFor="picture">Picture</label>
      <input type="file" name="picture" />
      <button type="submit">Send</button>
      <div className="form-message" ref={message}></div>
      <input type="hidden" name="form-name" value="contribute" />
    </form>
  )
}

export default ContributeForm
