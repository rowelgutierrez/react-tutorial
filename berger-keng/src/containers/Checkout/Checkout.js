import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancel={this.checkoutCancelHandler}
                    continue={this.checkoutContinueHandler}
                />

                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (
                        <ContactData 
                            // ingredients={this.props.ingredients}
                            // price={this.props.totalPrice}
                            {...props}
                        />
                    )} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        // totalPrice: state.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);