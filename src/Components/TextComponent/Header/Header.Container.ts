import { connect } from 'react-redux'
import Header from './Header.Component'
import { updateSettings, AddTextWidgetAction } from '../Text.Actions';
import { TextModel, TextActionTypes } from '../Text.Types';

export default connect<any, any, any>((store) => {
    return store
}, {
    updateSettingClick: updateSettings,
    handleAddTextWidget: addTextWidget
})(Header)


export function addTextWidget(data: TextModel): AddTextWidgetAction {
    return {
      type: TextActionTypes.ADD_TEXT_WIDGET,
      payload: data
    }
  }