import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

export default class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>
                            {ingKey}
                        </span> {this.props.ingredients[ingKey]}
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
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button 
                    type={'Danger'}
                    click={this.props.close}
                >CANCEL</Button>
                <Button 
                    type={'Success'}
                    click={this.props.continue}>CONTINUE</Button>
            </React.Fragment>
        );
    }
}