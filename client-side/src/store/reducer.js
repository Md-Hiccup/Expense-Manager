import * as actionTypes from './action';

const initialState = {
    token: []
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_TOKEN:
        console.log('actioontype addtoken')
            return {
                ...state,
                token: state.token.concat(action.tokenAdd )
            }
        case actionTypes.REMOVE_TOKEN:
        console.log('actioontype removetoken')        
            return {
                ...state,
                token: state.token.filter(tkn => tkn.token !== action.tokenRmv)
            }
    }
    return state;
}

export default reducer;