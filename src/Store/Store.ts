
// import logger from 'redux-logger' // only for development debugging
import { createStore } from 'redux'

import { State, reducer, initialState } from './Reducers'

import { composeWithDevTools } from 'redux-devtools-extension' // only for development debugging

const composeEnhancers = composeWithDevTools({ trace: true});


/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
const ArtifiStore = createStore<State, any, any, any>(
        reducer, 
        initialState, 
        composeEnhancers() // only for debugging
    ) //applyMiddleware(logger)


const ArtifiReactConstant = {
    CHANGE_SETTINGS: '[TextComponent] CHANGE_SETTINGS',
    CHANGE_LABEL: '[TextComponent] CHANGE_LABEL',
}