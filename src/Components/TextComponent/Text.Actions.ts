import { TextModel, TextActionTypes } from './Text.Types'

export interface UpdateLabelAction { type: typeof TextActionTypes.CHANGE_LABEL , payload: TextModel }
export interface UpdateSettingsAction { type: typeof TextActionTypes.CHANGE_SETTINGS , payload: TextModel }
export interface AddTextWidgetAction { type: typeof TextActionTypes.ADD_TEXT_WIDGET , payload: TextModel }
export interface SelectTextWidgetAction { type: typeof TextActionTypes.SELECT_TEXT_WIDGET , payload: any }
export interface UpdateTeaxareaValueAction { type: typeof TextActionTypes.UPDATE_TEXTAREA_VALUE , payload: any }
export interface UpdateFontFamilyListAction { type: typeof TextActionTypes.UPDATE_FONT_FAMILY_LIST , payload: any }
export interface UpdateDefaultFontFamilyAction { type: typeof TextActionTypes.UPDATE_DEFAULT_FONT_FAMILY , payload: any }
export interface UpdateFontSizeAction { type: typeof TextActionTypes.UPDATE_FONT_SIZE , payload: number }
export interface UpdateButtonBoldAction { type: typeof TextActionTypes.BTN_CLICK_BOLD, payload: any }
export interface UpdateButtonItalicAction { type: typeof TextActionTypes.BTN_CLICK_ITALIC, payload: any }
export interface UpdateButtonAlignAction { type: typeof TextActionTypes.BTN_CLICK_ALIGN, payload: any }
export interface UpdateButtonVAlignAction { type: typeof TextActionTypes.BTN_CLICK_VALIGN, payload: any }
export interface RemoveSelectionAction { type: typeof TextActionTypes.REMOVE_SELECTION, payload: any }




export function updateLabel(data: TextModel): UpdateLabelAction {
  return {
    type: TextActionTypes.CHANGE_LABEL,
    payload: data
  }
}

export function updateSettings(data: TextModel): UpdateSettingsAction {
    return {
      type: TextActionTypes.CHANGE_SETTINGS,
      payload: data
    }
  }

export type Action = UpdateLabelAction | UpdateSettingsAction | AddTextWidgetAction | SelectTextWidgetAction | UpdateTeaxareaValueAction | UpdateFontFamilyListAction | UpdateDefaultFontFamilyAction | UpdateFontSizeAction | UpdateButtonBoldAction | UpdateButtonItalicAction | UpdateButtonAlignAction | UpdateButtonVAlignAction | RemoveSelectionAction
