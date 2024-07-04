import UserList from "../UserList";
import { ADD_TO_CART,REMOVE_FROM_CART, USER_LIST,DECREASE_FROM_CART } from "./Constant";

  export const addToCartItem=(item)=>{
    return {
        type:ADD_TO_CART,
        data:item,
    }
 }

 export const removeFromCart=(item)=>{
  return {
      type:REMOVE_FROM_CART,
      data:item,
  }
}

export const decreaseFromCart=(item)=>{
  return {
      type:DECREASE_FROM_CART,
      data:item,
  }
}


  // export const getuserlist=(item)=>{
  //   return {
  //       type:USER_LIST,
      
  //   }
// }