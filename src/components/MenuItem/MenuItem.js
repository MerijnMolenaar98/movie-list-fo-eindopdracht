import React from "react";
import "./MenuItem.css";
import {NavLink} from "react-router-dom";

function MenuItem({url, icon, text}) {
    return (
        <li>
            <NavLink to={url} exact className="item" activeClassName="active">
                {icon}<span className="menu-text">{text}</span>
            </NavLink>
        </li>
    );
}

export default MenuItem;