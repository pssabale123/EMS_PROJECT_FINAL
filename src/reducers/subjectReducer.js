import * as actions from "../actions/actionTypes";

export const subjectReducer = (state = {subjects:[],currentSubject:""},action)=>{
    
    switch (action.type) {
        case actions.GET_ALL_SUBJECTS:{
            return{
                ...state,
                subjects:[...action.payload],
            }
        }       
        case actions.GET_CURRENT_SUBJECT:{
            return{
                ...state,
                currentSubject:action.payload
            }
        }
        case actions.ADD_SUBJECT:{
          state.subjects.push(action.payload);
          return{
            ...state,
        subjects: [...state.subjects],

          }
        }

        case actions.UPDATE_SUBJECT:{
            const ele = state.subjects.filter((sub) => sub._id === action.payload._id);
            const index = state.subjects.indexOf(ele[0]);
            state.subjects[index] = action.payload;
            return {
              ...state,
      
              subjects: [...state.subjects],
            };
        }

        case actions.DELETE_SUBJECT: {
            const newState = state.subjects.filter(
              (ele) => ele._id !== action.payload._id
            );
            return {
              ...state,
      
                subjects: newState,
            };
          }
            
    
        default: return state;
    }
}