import { TextInitialState, TextModel, TextActionTypes } from './Text.Types'
import { Action } from './Text.Actions'



export function TextReducer(state: TextModel = TextInitialState, action: Action) {
    console.log('TextComponent >> Reducer :: ', state, action)
    switch (action.type) {

        /*
        ** Text Component change labels
        ** @Input - payload = { LABEL : VALUE }
        ** example - { lblTitle: 'Add/Edit Text' }
        ** @Dispatcher - { type: ACTION, payload: { LABEL: VALUE } }
        ** example - { type: '[TextComponent] CHANGE_LABEL', payload: { lblTitle: 'Add/Edit Text' } }
        */
        case TextActionTypes.CHANGE_LABEL: {
            state.label = { ...state.label, ...action.payload }
            return { ...state }
        }

        case TextActionTypes.CHANGE_SETTINGS: {
            return { ...state, ...action.payload }
        }

        case TextActionTypes.UPDATE_TEXT_WIDGET_LIST: {
            state.list = { ...action.payload }
            return { ...state }
        }

        case TextActionTypes.SELECT_TEXT_WIDGET: {
            state.selectedWidget = { ...action.payload }
            state.details = { ...state.details, ...{ data: action.payload } }; 
            return { ...state }
        }

        case TextActionTypes.UPDATE_TEXTAREA_VALUE: {
            if(typeof state.details != 'undefined' && typeof state.details.data != 'undefined'){
                state.details.data.text = action.payload.value
            }
            for (let i in state.list){
                if(state.list[i].id == action.payload.widget_id){
                    state.list[i].text = action.payload.value
                }
            }
            return { ...state }
        }

        case TextActionTypes.UPDATE_FONT_FAMILY_LIST: {
            if(typeof state.details != 'undefined' && typeof state.details.fontFamily != 'undefined'){
                state.details.fontFamily = action.payload
            } else {
                state.details = { ...state.details, ...{fontFamily: action.payload}}
            }
            return { ...state }
        }

        case TextActionTypes.UPDATE_DEFAULT_FONT_FAMILY: {
            if(action.payload != null) {
                if(typeof state.details != 'undefined' && typeof state.details.defaultFontFamily != 'undefined'){
                    state.details.defaultFontFamily = action.payload
                } else {
                    state.details = { ...state.details, ...{defaultFontFamily: action.payload}}
                }
            }            
            return { ...state }
        }

        case TextActionTypes.UPDATE_FONT_SIZE: {
            if(action.payload != null) {
                if(typeof state.details != 'undefined' && typeof state.details.data != 'undefined'){
                    state.details.data.fontSize = action.payload
                }
            }            
            return { ...state }
        }

        case TextActionTypes.BTN_CLICK_BOLD: {
            if(typeof state.details != 'undefined' && typeof state.details.data.fontWeight != 'undefined'){
                state.details.data.fontWeight = state.details.data.fontWeight == 'normal' ? 'bold' : 'normal'
            }
            return { ...state }
        }
        
        case TextActionTypes.BTN_CLICK_ITALIC: {
            if(typeof state.details != 'undefined' && typeof state.details.data.fontStyle != 'undefined'){
                state.details.data.fontStyle = state.details.data.fontStyle == 'normal' ? 'italic' : 'normal'
            }
            return { ...state }
        }
        
        case TextActionTypes.BTN_CLICK_ALIGN: {
            if(typeof state.details != 'undefined' && typeof state.details.data.textAlign != 'undefined'){
                state.details.data.textAlign = action.payload
            }
            return { ...state }
        }

        case TextActionTypes.BTN_CLICK_VALIGN: {
            if(typeof state.details != 'undefined' && typeof state.details.data.vAlign != 'undefined'){
                state.details.data.vAlign = action.payload
            }
            return { ...state }
        }

        case TextActionTypes.REMOVE_SELECTION: {
            if(typeof state.details != 'undefined' && typeof state.details.data != 'undefined'){
                state.details.data = {}
                state.selectedWidget = {}
            }
            return { ...state }
        }
        
        default:
        return state
    }

}
