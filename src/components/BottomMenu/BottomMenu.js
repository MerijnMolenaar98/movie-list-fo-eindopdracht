import React from "react";
import "./BottomMenu.css";
import { FaSearch, FaList, FaStarHalfAlt } from 'react-icons/fa';
import {BsPersonFill} from "react-icons/bs";
import MenuItem from "../MenuItem/MenuItem";

function BottomMenu() {
    return (
        <nav>
            <ul>
            <MenuItem url="/search" icon={<FaSearch />} text="Zoeken"/>
            <MenuItem url="/list" icon={<FaList />} text="Lijst"/>
            <MenuItem url="/rating" icon={<FaStarHalfAlt />} text="Rating"/>
            <MenuItem url="/account" icon={<BsPersonFill />} text="Account"/>
            </ul>
        </nav>
    );
}

export default BottomMenu;