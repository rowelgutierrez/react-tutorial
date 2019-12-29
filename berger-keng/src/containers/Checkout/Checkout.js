import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />;

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased? <Redirect to="/" /> : null;

            summary = (
                <React.Fragment>
                    { purchasedRedirect }

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
                </React.Fragment>
            );
        }

        return (
            <div>
                { summary }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        // totalPrice: state.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);