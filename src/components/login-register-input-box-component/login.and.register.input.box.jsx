import React from "react";
import "./login.and.register.input.box.css"

function LoginInput(props) {
    return (
        <div className="wrap-input100 validate-input" data-validate = {props.dataValidate}>
        <input className="input100 has-val" type={props.type} name={props.name} onChange={props.onChange} value={props.value} />
        <span className="focus-input100"></span>
        <span className="label-input100">{props.label}</span>
    </div>
    )
}

export default LoginInput;
