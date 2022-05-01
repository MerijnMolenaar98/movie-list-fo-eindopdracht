import React from "react";
import "./Button.css";
import {Link} from "react-router-dom";

function Button({text, primary, target, onClick}) {
    if (target) {
        return (<Link className="link" to={target}><button className={primary ? 'primary' : 'secondary'}>{text}</button></Link>);
    } else {
        return (<button type="submit" className={primary ? 'primary' : 'secondary'} onClick={onClick}>{text}</button>);
    }
}

export default Button;