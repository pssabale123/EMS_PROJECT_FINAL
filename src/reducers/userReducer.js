import * as actions from "../actions/actionTypes";

export const userReducer = (state = {users:[],currentUser:""},action)=>{
    
    switch (action.type) {
        case actions.GET_ALL_USERS:{
            return{
                ...state,
                users:[...action.payload],
            }
        }    
       

        case actions.GET_CURRENT_USER:{
            return{
                ...state,
                currentUser:action.payload
            }
        }

        case actions.ADD_USER:{
            state.users.push(action.payload);
            return{
                ...state,
                users:[...state.users]
            }
        }

        case actions.UPDATE_USER:{
            const ele = state.users.filter((user) => user._id === action.payload._id);
            const index = state.users.indexOf(ele[0]);
            state.users[index] = action.payload;
            return {
              ...state,
      
              users: [...state.users],
            };
        }
        case actions.DELETE_USER: {
            const newState = state.users.filter(
              (ele) => ele._id !== action.payload._id
            );
            return {
              ...state,
      
              users: newState,
            };
          }    
            
    
        default: return state;
    }
}