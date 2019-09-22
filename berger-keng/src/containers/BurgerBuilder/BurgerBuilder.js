import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.9
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchaseable: false,
        purchasing: false
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContineHandler = () => {
        alert("Pheeww");
    }

    updateIngredient = (type, value, multiplier=1) => {
        const ingredients = { ...this.state.ingredients };
        const count = this.state.ingredients[type] + value * multiplier;

        if (count < 0) {
            return;
        }

        ingredients[type] = count;

        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type] * multiplier;

        const sumIngredients = Object.keys(ingredients)
            .reduce((sum, ingKey) => sum + ingredients[ingKey], 0)

        this.setState({
            ingredients,
            totalPrice,
            purchaseable: sumIngredients > 0
        });
    }

    addIngredient = (type) => {
        this.updateIngredient(type, 1);
    }

    removeIngredient = (type) => {
        this.updateIngredient(type, 1, -1);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing}
                    modalClose={this.purchaseCancelHandler}
                >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        close={this.purchaseCancelHandler}
                        continue={this.purchaseContineHandler}
                        totalPrice={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    order={this.purchaseHandler} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;