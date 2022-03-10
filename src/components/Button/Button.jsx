import React from "react";
import s from './Button.module.css';
import propTypes from "prop-types";


const Button = ({text, onClick}) => { 
    return <button type="button" className={s.Button} onClick={onClick} >{text}</button>
};

Button.propTypes = {
    text: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired,
};

export default Button;