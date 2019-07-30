import { connect } from 'react-redux'
import { updateSettings, triggerEvent } from './Title.Actions'
import Title from './Title.Component'


export default connect<any, any, any>((Store) => {
    return Store
}, {
    
    updateSettingClick: updateSettings,
    handleEventTrigger: triggerEvent

})(Title)
