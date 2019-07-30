import * as React from 'react'

import { TitleEvent, TitleActionTypes, Constants } from './Title.Types'

interface Props {
  title: any,
  updateSettingClick: (value: TitleEvent) => void,
  handleEventTrigger: (value: TitleEvent) => void
}

interface State {
  value: string
}

export default class Title extends React.Component<Props, State > {
  constructor(props: Props) {
    super(props)
    console.log('title compo');
    this.state = this.props.title // Value is empty by default
    this._handleAddBtnClick = this._handleAddBtnClick.bind(this)


  }

  _handleUpdateSettingClick(payload: any) {
    this.props.updateSettingClick(payload)
  }

  _handleAddBtnClick() {
    let evtData : TitleEvent = {
      evtName: TitleActionTypes.EVT_CLICK_ADD_BUTTON,
      evtPayload: {
        msg: 'Add Button Clicked.'
      }
    }
    this.props.handleEventTrigger(evtData)
  }

  render() {
    const { _handleAddBtnClick, props } = this

    return (
      <>
      
        <header className="content-padding clearfix tab-heading">
          <h3 className="pull-left">{props.title.titleText}</h3>
          {
            props.title.isAllowText
              ? <button onClick={_handleAddBtnClick} className="btn btn-primary pull-right" title="{props.title.btnText}">
                  {props.title.btnText}
                </button>
              : ''
          }
        </header>       
      </>
    )
  }
}


