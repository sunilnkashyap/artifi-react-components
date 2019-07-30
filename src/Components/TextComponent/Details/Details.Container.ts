import { connect } from 'react-redux'
import Details from './Details.Component'
import { UpdateTeaxareaValueAction, UpdateDefaultFontFamilyAction, UpdateFontSizeAction, UpdateButtonBoldAction, UpdateButtonItalicAction, UpdateButtonAlignAction, UpdateButtonVAlignAction } from '../Text.Actions';
import { TextActionTypes } from '../Text.Types';

export default connect<any, any, any>((store) => {
    return store
}, {
  updateTextarea: updateTextarea,
  updateDefaultFontFamily: updateDefaultFontFamily,
  updateFontSize: updateFontSize,
  handleBoldClick: handleBoldClick,
  handleItalicClick: handleItalicClick,
  handleAlignClick: handleAlignClick,
  handleVAlignClick: handleVAlignClick
})(Details)


export function updateTextarea(data: any): UpdateTeaxareaValueAction {
  return {
    type: TextActionTypes.UPDATE_TEXTAREA_VALUE,
    payload: data
  }
}

export function updateDefaultFontFamily(data: any): UpdateDefaultFontFamilyAction {
  return {
    type: TextActionTypes.UPDATE_DEFAULT_FONT_FAMILY,
    payload: data
  }
}

export function updateFontSize(data: number): UpdateFontSizeAction {
  return {
    type: TextActionTypes.UPDATE_FONT_SIZE,
    payload: data
  }
}

export function handleBoldClick(): UpdateButtonBoldAction {
  return {
    type: TextActionTypes.BTN_CLICK_BOLD,
    payload: {}
  }
}

export function handleItalicClick() : UpdateButtonItalicAction{
  return {
    type: TextActionTypes.BTN_CLICK_ITALIC,
    payload: {}
  }
}

export function handleAlignClick(data: string) : UpdateButtonAlignAction {
  return {
    type: TextActionTypes.BTN_CLICK_ALIGN,
    payload: data
  }
}


export function handleVAlignClick(data: string) : UpdateButtonVAlignAction {
  return {
    type: TextActionTypes.BTN_CLICK_VALIGN,
    payload: data
  }
}

