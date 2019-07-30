import { TitleInitialState, TitleModel, TitleActionTypes } from './Title.Types'
import { Action } from './Title.Actions'



export function TitleReducer(state: TitleModel = TitleInitialState, action: Action) {
    
    switch (action.type) {

        case TitleActionTypes.UPDATE_SETTINGS: {
            const title = action.payload
            return { ...state, ...title }
        }

        case TitleActionTypes.TRIGGER_EVENT: {
            console.log('Title Reducer :: trigger custom events')
            return state
        }

        default:
        return state
    }

}
