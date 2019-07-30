import { TitleModel, TitleEvent, TitleActionTypes, Constants } from './Title.Types'

export interface UpdateSettingsAction { type: typeof TitleActionTypes.UPDATE_SETTINGS , payload: TitleModel }
export interface TriggerEventAction { type: typeof TitleActionTypes.TRIGGER_EVENT, payload: TitleEvent }

export function updateSettings(data: TitleModel): UpdateSettingsAction {
  return {
    type: TitleActionTypes.UPDATE_SETTINGS,
    payload: data
  }
}

export function triggerEvent(data: TitleEvent) {

    return {
        type: TitleActionTypes.TRIGGER_EVENT,
        payload: data
    }
}

export type Action = UpdateSettingsAction | TriggerEventAction
