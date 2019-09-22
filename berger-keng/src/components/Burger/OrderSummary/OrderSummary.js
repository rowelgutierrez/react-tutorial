import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {ingKey}
                    </span> {props.ingredients[ingKey]}
                </li>
            );
        });

    return (
        <React.Fragment>
            <h3>
                Your Order
            </h3>
            <p>
                Delicious Burger with the ff. ingredients:
            </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button 
                type={'Danger'}
                click={props.close}
            >CANCEL</Button>
            <Button 
                type={'Success'}
                click={props.continue}>CONTINUE</Button>
        </React.Fragment>
    );
};

export default orderSummary;