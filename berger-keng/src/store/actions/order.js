import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        dispatch(fetchOrdersStart());
        
        const queryParams = `?auth=${getState().auth.token}&orderBy="userId"&equalTo="${getState().auth.userId}"`;
        const orders = [];

        try {
            const { data } = await axios.get(`/orders.json${queryParams}`);
            for (let key in data) {
                orders.push({
                    ...data[key],
                    id: key
                });
            }

            dispatch(fetchOrdersSuccess(orders));
        } catch (error) {
            dispatch(fetchOrdersFail(error));
        }
    }
}

export const purchaseBurger = (orderData, token) => {
    return async dispatch => {
        try {
            dispatch(purchaseBurgerStart());
            const data = await axios.post(`/orders.json?auth=${token}`, orderData);
            dispatch(purchaseBurgerSuccess(data.name, orderData));
        } catch (error) {
            dispatch(purchaseBurgerFail(error));
        }
    };
}