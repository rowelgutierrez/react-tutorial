import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.9
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    async componentDidMount() {
        try {
            const { data } = await axios.get('https://react-my-burger-f73fb.firebaseio.com/ingredients.json');
            this.setState({ ingredients: data })
        } catch (error) {
            this.setState({ error: true });
        }
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContineHandler = async () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        }

        queryParams.push(`price=${this.state.totalPrice}`)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });
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

        let orderSummary = null;
        let burger = this.state.error? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
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

            orderSummary = (<OrderSummary 
                ingredients={this.state.ingredients}
                close={this.purchaseCancelHandler}
                continue={this.purchaseContineHandler}
                totalPrice={this.state.totalPrice} />);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing}
                    modalClose={this.purchaseCancelHandler}
                >
                    { orderSummary }
                </Modal>
                { burger }
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);