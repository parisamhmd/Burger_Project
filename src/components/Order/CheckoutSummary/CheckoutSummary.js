import React from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well</h1>
            <div style={{ width: '100%', height: '300px', margin:'auto' , marginBottom:'200px'}}>
                <Burger ingredient={props.ingredient} />
            </div>

            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>)
}

export default CheckoutSummary; 