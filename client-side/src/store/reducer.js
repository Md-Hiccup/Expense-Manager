import * as actionTypes from './action';

const initialState = {
    user: []
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_USER:
        console.log('actioontype adduser')
            return {
                ...state,
                user: state.user.concat(action.personName )
            }
        case actionTypes.REMOVE_USER:
        console.log('actioontype removeuser')        
            return {
                ...state,
                user: state.user.filter(tkn => tkn.user !== action.personName)
            }
    }
    return state;
}

export default reducer;