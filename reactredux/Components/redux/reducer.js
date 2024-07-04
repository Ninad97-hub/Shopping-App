import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_USER_DATA,
  DECREASE_FROM_CART,
} from './Constant';

const initialState = [];
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.findIndex(
        item => item.name === action.data.name,
      );

      if (existingItemIndex != -1) {
        // If item already exists, update its quantity
        return state.map((item, index) => {
          if (index === existingItemIndex) {
            return {...item, quantity: item.quantity + 1};
          }
          return item;
        });
      } else {
        // If item is not in the cart, add it with quantity 1
        return [...state, {...action.data, quantity: 1}];
      }

    case REMOVE_FROM_CART:
      // If item already exists, update its quantity

      let remaningItems = state.filter(item => {
        return item.name != action.data;
      });
      return [...remaningItems];

    case DECREASE_FROM_CART:
      const existingItemIndexToDecrease = state.findIndex(
        item => item.name === action.data.name,
      );
      if (action.data.quantity >= 1) {
        if (existingItemIndexToDecrease != -1) {
          // If item already exists, update its quantity
          return state.map((item, index) => {
            if (index === existingItemIndexToDecrease) {
              return {...item, quantity: item.quantity - 1};
            }
            return item;
          });
        }
      } 

    // case SET_USER_DATA:
    //   return [ action.data];

    default:
      return state;
  }
};
