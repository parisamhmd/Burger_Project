import React from 'react'; 
import burgerlogo from '../../assets/images/burgerlogo.png'
import classes from './Logo.module.css'

const Logo=(props)=>(
    <div className={classes.Logo} style={{height :props.height}}>
        <img src={burgerlogo} />
    </div>
); 
export default Logo; 