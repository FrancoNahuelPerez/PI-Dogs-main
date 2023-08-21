import { GET_DOGS, GET_DOGS_ID, GET_DOGS_NAME, GET_TEMPERAMENTS,POST_DOGS } from './actionTypes'



const initialState ={
    dogs: [],
    dogsDetail: {},
    temperaments: [],
    allDogs: []
}


const rootReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload,
            }
        case GET_DOGS_NAME:
            return{
                ...state,
                dogs: action.payload,
            }
        case GET_DOGS_ID:
            return{
                ...state,
                dogsDetail: action.payload,
            }
        case POST_DOGS:
            return{
                ...state,
                allDogs: [...state.dogs, action.payload]
            }
        default:
            return {...state}
    }
}

export default rootReducer