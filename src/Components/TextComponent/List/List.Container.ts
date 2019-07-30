import { connect } from 'react-redux'
import List from './List.Component'

import { TextModel, TextActionTypes } from '../Text.Types';
import { SelectTextWidgetAction } from '../Text.Actions';

export default connect<any, any, any>((store) => {
    return store
}, {
  handleSelectWidget: handleSelectWidget,
    // handleAddTextWidget: addTextWidget
})(List)

export function handleSelectWidget(data: any): SelectTextWidgetAction {
  console.log('ListComponent >> Action :: ', data)
  return {
    type: TextActionTypes.SELECT_TEXT_WIDGET,
    payload: data
  }
}