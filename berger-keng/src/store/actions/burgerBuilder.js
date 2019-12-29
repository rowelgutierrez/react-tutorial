import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredientName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    };
};

export const removeIngredient = ingredientName => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    };
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('https://react-my-burger-f73fb.firebaseio.com/ingredients.json');
            dispatch(setIngredients(data));
        } catch (error) {
            dispatch(fetchIngredientsFailed())
        }
    }
};