import React from 'react';
import Auxilary from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button'


const OrderSummary=(props)=>{

    const ingredientSummary =Object.keys(props.ingredients)
    .map(igkey=>{
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>{props.ingredients[igkey]}</li>
    })
    return(
        <Auxilary>
            <h3>Your Order:</h3>
            <p>Your burger with this ingrdient :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>             

        </Auxilary>
    )
}
export default OrderSummary