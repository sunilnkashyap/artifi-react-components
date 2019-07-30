import { combineReducers } from 'redux'

import { TextModel, TextInitialState } from '../Components/TextComponent/Text.Types'
import { TextReducer } from '../Components/TextComponent/Text.Reducers'

export interface State {
    textComponent: TextModel,
    lastAction?: any,
    constants?: any
}

/*
 * initialState of the app
 */
export const initialState: State = {
    textComponent: TextInitialState,
    lastAction: {},
    constants: {
        fontImageBaseUrl: 'http://localhost:8081/UserImages/137708DD-8198-4922-B167-0C90CA79F57F/2a60955f-8f27-481d-832c-a45e004870ab/FontImage/'
    }
}

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const reducer = combineReducers<State>({
    textComponent: TextReducer,
    lastAction: LastAction,
    constants: Constancts
})


export function LastAction(state = null, action: any) {
    return action;
}

export function Constancts(state = initialState, action: any) {
    switch(action.type){
        case '[ArtifiConstants] UPDATE_CONSTANT':
            return { ...state.constants, ...action.payload }
        default:
            return state
    }
    
}
