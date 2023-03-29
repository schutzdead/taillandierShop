import { useState } from "react"
import styles from "./form.module.css"
import { formInput, formCB } from "../type"
import { Check } from "@/pictureIndex/indexCart"
import Image from "next/image"

export function unValid (e :any,setCustomError:any) {
    (e.target as HTMLInputElement).setCustomValidity(' ')
    setCustomError(true)
}

const errorSpan = { display:"unset" }
const noErrorSpan = { display:"none" }

export function checkIfError (e:any, setCustomError:any, setCustomErrorLabel:any) { 
    if(e.target.validity.patternMismatch || e.target.validity.tooShort){ setCustomError(true) }
    else { setCustomError(false) }

    if(e.target.validity.valid){ setCustomErrorLabel(false) }
    else { setCustomErrorLabel(true) }
}

export function FormInput ({label, placeholder, span, pattern}:formInput) {

    const errorInput = { fontSize:"0.85rem", marginTop:"-5px" }
    const noErrorInput = { fontSize:"1.1rem", marginTop:"0" }

    const noErrorBorder= { borderColor:"rgb(61, 201, 173, 0.7)" }
    const errorBorder = { borderColor:"rgb(0, 0, 0, 0.5)"}

    const [customError, setCustomError] = useState(false)
    const [customErrorLabel, setCustomErrorLabel] = useState(true)

    return(
    <div className={styles.inputStyle} style={customErrorLabel ? errorBorder : noErrorBorder}>
        <label htmlFor={label} >{label}</label>
        <input  onChange={(e) => {
                    e.target.setCustomValidity('')
                    checkIfError(e, setCustomError, setCustomErrorLabel)
                }} 
                onInvalid={(e) => {unValid(e,setCustomError)}}
                style={customError ? errorInput : noErrorInput} 
                type="text" 
                id={label} 
                pattern={pattern} 
                autoComplete="off" 
                placeholder={placeholder}
                spellCheck="false"
                required />
        <span style={customError ? errorSpan : noErrorSpan}>{span}</span>
    </div>
    )
}

export function FormCB ({placeholder, pattern, type, span}:formCB) {

    const errorInput = { fontSize:"1rem", marginTop:"5px" }
    const noErrorInput = { fontSize:"1.05rem", marginTop:"5px" }

    const noErrorImage= { display: "unset" }
    const errorImage = { display: "none"}

    const [customError, setCustomError] = useState(false)
    const [customErrorLabel, setCustomErrorLabel] = useState(true)

    return(
        <div className={styles.cbStyle}>
            <input  onChange={(e) => {
                        e.target.setCustomValidity('')
                        checkIfError(e, setCustomError, setCustomErrorLabel)
                    }}  
                    onInvalid={(e) => {unValid(e,setCustomError)}}
                    style={customError ? errorInput : noErrorInput} 
                    type={type}
                    pattern={pattern}
                    placeholder={placeholder}
                    spellCheck="false"
                    required />
            <Image
                src={Check}
                alt=""
                priority
                style={customErrorLabel ? errorImage : noErrorImage}/>        
            <span style={customError ? errorSpan : noErrorSpan}>{span}</span>
        </div>
    )
}