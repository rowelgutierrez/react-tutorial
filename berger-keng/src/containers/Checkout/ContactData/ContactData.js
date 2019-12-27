import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = async (event) => {
        event.preventDefault(); // prevents form submission
        console.log(this.props.ingredients);
        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Rowel Gutierrez',
                address: {
                    street: 'On the street where you live',
                    zipCode: '423423',
                    country: 'Philippines'
                },
                email: 'my@email.com'
            },
            deliveryMethod: 'fastest'
        };

        try {
            const data = await axios.post('/orders.json', order);
            console.log(data);
        } catch (error) {
            console.log(error);
        }

        this.setState({ loading: false });
        this.props.history.push('/');
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="You name" />
                <input className={classes.Input} type="email" name="email" placeholder="You email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />

                <Button type="Success" click={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                { form }
            </div>
        );
    }
}

export default ContactData;