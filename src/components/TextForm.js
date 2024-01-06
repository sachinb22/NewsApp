import React, { useState } from 'react'
import PropTypes from 'prop-types'

function TextForm(props) {

    const [text, setText] = useState('')

    const [isUpperCase, setIsUpperCase] = useState(false)

    const handleConvert = () => {
        setIsUpperCase((prev) => !prev)
        setText((text) => (isUpperCase ? text.toLowerCase() : text.toUpperCase()))
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text
        window.speechSynthesis.speak(msg)
    }

  return (
    <>
    <div className="container" style={{color: props.mode === 'dark' ? 'white': 'black'}}>
        <h4>{props.heading}</h4>
    <div className="mb-3 ">
    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'dark' ? '#86b7fe': 'white', color: props.mode === 'dark' ? 'white': 'black'}} id="myBox" rows="8"></textarea>
    </div>
    <button disabled={text.length===0} className='btn btn-primary' onClick={handleConvert}> {isUpperCase ? 'Convert to Lowercase' : 'Convert to Uppercase'} </button>
    <button disabled={text.length===0} className='btn btn-warning ms-2' onClick={handleSpeak}>Read Text</button>

    <div className="my-3" style={{color: props.mode === 'dark' ? 'white': 'black'}}>
        <h1>Your text summary</h1>
        {/* <p>{text.split(" ").length-1} words and {text.length} characters</p> */}
        <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0 ? text : 'Enter text to preview it here..' }</p>
    </div>

    </div>
    </>
  )
}

export default TextForm

TextForm.propTypes = {
    heading: PropTypes.string.isRequired
}