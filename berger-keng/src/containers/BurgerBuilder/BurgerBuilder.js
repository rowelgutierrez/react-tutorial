import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
    addIngredient,
    removeIngredient,
    initIngredients,
    purchaseInit,
    setAuthRedirectPath
} from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        // loading: false,
        // error: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });   
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContineHandler = async () => {
        // const queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ingredients[i])}`);
        // }

        // queryParams.push(`price=${this.props.totalPrice}`)
        // const queryString = queryParams.join('&');

        this.props.onInitPurchase();

        this.props.history.push({
            pathname: '/checkout',
            // search: `?${queryString}` // URL Query Params
        });

        // OR this.props.history.push('/checkout')
    }

    isPurchaseable = () => {
        const ingredients = { ...this.props.ingredients };
        const sumIngredients = Object.keys(ingredients)
            .reduce((sum, ingKey) => sum + ingredients[ingKey], 0)

        return sumIngredients > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={(ingredientName) => this.props.onIngredientAdded(ingredientName)}
                        removeIngredient={(ingredientName) => this.props.onIngredientRemoved(ingredientName)}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.isPurchaseable()}
                        order={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </React.Fragment>
            );

            orderSummary = (<OrderSummary 
                ingredients={this.props.ingredients}
                close={this.purchaseCancelHandler}
                continue={this.purchaseContineHandler}
                totalPrice={this.props.totalPrice} />);
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));