import { connect } from 'react-redux'
import Text from './Text.Component'
// import { updateSettings, AddTextWidgetAction } from '../Text.Actions';
// import { TextModel, TextActionTypes } from '../Text.Types';

export default connect<any, any, any>((store) => {
    return store
}, {
    // updateSettingClick: updateSettings,
    // handleAddTextWidget: addTextWidget
})(Text)

